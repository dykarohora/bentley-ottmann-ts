import AVLTree from 'avl'
import { setInitialEventPoint } from './setInitialEventPoint'
import { initializeSweepLine, SweepLine } from './sweepLine'
import { compareSegmentAscBySweepLine } from '../comparator/compareSegmentAscBySweepLine'
import { comparePointAsc } from '../comparator/comparePointAsc'
import { findSegmentsRelatedWithEventPoint } from './findSegmentsRelatedWithEventPoint'
import { detectIntersectionFromAdjacentWithEndSegments } from './detectIntersectionFromAdjacentWithEndSegments'
import { detectIntersectionFromCrossingSegments } from './detectIntersectionFromCrossingSegments'

type EventPointHandlerPayload = {
  point: EventPoint,
  eventQueue: AVLTree<EventPoint, EventPoint>
  statusTree: AVLTree<Segment, Segment>
  output: AVLTree<Point, Point>
  sweepLine: SweepLine
}

type UpdateStatusTreePayload = {
  statusTree: AVLTree<Segment, Segment>
  crossingSegments: Segment[],
  startSegments: Segment[]
  sweepLine: SweepLine
}

const updateStatusTree =
  ({
    startSegments,
    crossingSegments,
    statusTree,
    sweepLine,
  }: UpdateStatusTreePayload) => {
    // イベント点が線分の交点であった場合はそれぞれの線分の順序を交換して隣接線分との交差判定を行う
    crossingSegments.forEach(seg => {
      statusTree.remove(seg)
    })

    sweepLine.setPhase('forward')

    crossingSegments.forEach(seg => {
      statusTree.insert(seg)
    })

    startSegments.forEach(seg => {
      statusTree.insert(seg)
    })
  }

const handleEventPoint =
  ({
    point,
    eventQueue,
    statusTree,
    output,
    sweepLine,
  }: EventPointHandlerPayload) => {
    const {
      startSegments,
      endSegments,
      crossingSegments,
    } = findSegmentsRelatedWithEventPoint({ point, statusTree })
    updateStatusTree({ startSegments, crossingSegments, statusTree, sweepLine })

    crossingSegments.push(...startSegments)

    if (crossingSegments.length > 1) {
      output.insert(point, point)
    }

    if (crossingSegments.length === 0 && endSegments.length > 0) {
      detectIntersectionFromAdjacentWithEndSegments({ endSegments, statusTree, output, eventQueue })
    } else {
      detectIntersectionFromCrossingSegments({ crossingSegments, statusTree, output, eventQueue, sweepLine })
    }

    endSegments.forEach(seg => {
      statusTree.remove(seg)
    })
  }

export const detectIntersections =
  (segments: Segment[]): Point[] => {
    const sweepLine = initializeSweepLine(0)

    const eventQueue = setInitialEventPoint(segments)
    const statusTree = new AVLTree<Segment, Segment>(compareSegmentAscBySweepLine(sweepLine), true)
    const output = new AVLTree<Point, Point>(comparePointAsc, true)

    while (!eventQueue.isEmpty()) {
      const eventPoint = eventQueue.pop()
      if (eventPoint === null || eventPoint.key === undefined) {
        throw new Error('Application Bug')
      }

      sweepLine.setPhase('backward')
      sweepLine.setXCoord(eventPoint.key.x)
      handleEventPoint({ point: eventPoint.key, eventQueue, statusTree, output, sweepLine })
    }

    const intersectionPoints: Point[] = []

    output.forEach(p => {
      const x = p.key?.x
      const y = p.key?.y

      if (x === undefined || y === undefined) {
        throw new Error('Application Bug')
      }

      intersectionPoints.push({ x, y })
    })

    return intersectionPoints
  }
