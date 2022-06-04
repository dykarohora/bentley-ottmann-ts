import AVLTree from 'avl'
import { SweepLine } from './sweepLine'
import { compareSegmentAscBySweepLine } from '../comparator/compareSegmentAscBySweepLine'
import { findNewEventPoint } from './findNewEventPoint'

type Payload = {
  crossingSegments: Segment[]
  statusTree: AVLTree<Segment, Segment>
  output: AVLTree<Point, Point>
  eventQueue: AVLTree<EventPoint, EventPoint>
  sweepLine: SweepLine
}

export const detectIntersectionFromCrossingSegments =
  ({
    crossingSegments,
    statusTree,
    output,
    eventQueue,
    sweepLine,
  }: Payload) => {
    crossingSegments.sort(compareSegmentAscBySweepLine(sweepLine))

    const firstSegment = crossingSegments[0]
    const lastSegment = crossingSegments[crossingSegments.length - 1]

    if (firstSegment === undefined || lastSegment === undefined) {
      throw new Error('Application Bug')
    }

    const firstSegmentNode = statusTree.find(firstSegment)
    const adjacentFirstSegment = firstSegmentNode && statusTree.prev(firstSegmentNode)

    const secondSegmentNode = statusTree.find(lastSegment)
    const adjacentLastSegment = secondSegmentNode && statusTree.next(secondSegmentNode)

    if (adjacentFirstSegment && adjacentFirstSegment.key && firstSegment) {
      findNewEventPoint({ first: adjacentFirstSegment.key, second: firstSegment, output, eventQueue })
    }

    if (adjacentLastSegment && adjacentLastSegment.key && lastSegment) {
      findNewEventPoint({ first: adjacentLastSegment.key, second: lastSegment, output, eventQueue })
    }

  }
