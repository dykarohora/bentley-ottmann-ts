import AVLTree from 'avl'
import { comparePointAsc } from '../comparator/comparePointAsc'
import { cleanSegmentOrder } from '../util/cleanSegmentOrder'

export const setInitialEventPoint =
  (segments: Segment[]): AVLTree<EventPoint, EventPoint> => {
    const eventQueue = new AVLTree<EventPoint, EventPoint>(comparePointAsc, true)

    segments.forEach(
      (segment) => {
        const sorted = cleanSegmentOrder(segment)

        const start: EventPoint = {
          type: 'start',
          segments: [],
          ...sorted.start,
        }

        const end: EventPoint = {
          type: 'end',
          segments: [],
          ...sorted.end,
        }

        eventQueue.insert(start, start)

        const startFromQueue = eventQueue.find(start)?.key

        if (startFromQueue === undefined) {
          throw new Error('Application Bug')
        }

        startFromQueue.segments.push(sorted)

        eventQueue.insert(end, end)
      },
    )

    return eventQueue
  }
