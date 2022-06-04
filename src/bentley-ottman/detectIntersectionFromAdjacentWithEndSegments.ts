import AVLTree from 'avl'
import { findNewEventPoint } from './findNewEventPoint'

type Payload = {
  endSegments: Segment[]
  statusTree: AVLTree<Segment, Segment>
  output: AVLTree<Point, Point>
  eventQueue: AVLTree<EventPoint, EventPoint>
}

/**
 * イベント点が終点である線分と上下に隣接する線分が交差するか判定し、
 * その後、イベント点が終点である線分を状態木から除外する
 * @param endSegments
 * @param statusTree
 * @param output
 * @param eventQueue
 */
export const detectIntersectionFromAdjacentWithEndSegments =
  ({
    endSegments,
    statusTree,
    output,
    eventQueue,
  }: Payload) => {
    endSegments.forEach(seg => {
      const node = statusTree.find(seg)
      if (node === null) {
        throw new Error('Application Bug')
      }

      const prevSegment = statusTree.prev(node)
      const nextSegment = statusTree.next(node)

      if (
        prevSegment !== null &&
        nextSegment !== null &&
        prevSegment.key &&
        nextSegment.key
      ) {
        findNewEventPoint({ first: prevSegment.key, second: nextSegment.key, output, eventQueue })
      }
    })
  }
