import AVLTree from 'avl'
import { isEndPoint } from '../geometry/isEndPoint'
import { isStartPoint } from '../geometry/isStartPoint'
import { isPointOnSegment } from '../geometry/isPointOnSegment'

type Payload = {
  point: EventPoint,
  statusTree: AVLTree<Segment, Segment>
}

export const findSegmentsRelatedWithEventPoint =
  ({
    point,
    statusTree,
  }: Payload) => {
    const startSegments: Segment[] = point.segments
    const endSegments: Segment[] = []
    const crossingSegments: Segment[] = []

    statusTree.forEach(node => {
      const segment = node.key
      if (segment === undefined) {
        throw new Error('Application Bug')
      }

      if (isEndPoint({ segment, point })) {
        endSegments.push(segment)

        return
      }

      if (!isStartPoint({ segment, point }) && isPointOnSegment({ segment, point })) {
        crossingSegments.push(segment)
      }
    })

    return {
      startSegments,
      endSegments,
      crossingSegments,
    }
  }
