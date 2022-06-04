import AVLTree from 'avl'
import { constVoid, pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { isIntersectSegments } from '../geometry/isIntersectSegments'
import { calculateIntersectionPoint } from '../geometry/calculateIntersectionPoint'

type Payload = {
  first: Segment,
  second: Segment,
  output: AVLTree<Point, Point>
  eventQueue: AVLTree<EventPoint, EventPoint>
}

export const findNewEventPoint =
  ({
    first,
    second,
    output,
    eventQueue,
  }: Payload): void =>
    pipe(
      { first, second },
      O.fromPredicate(isIntersectSegments),
      O.chain(calculateIntersectionPoint),
      O.matchW(
        constVoid,
        (intersectionPoint) => {
          const newEventPoint: EventPoint = { ...intersectionPoint, segments: [], type: 'intersection' }
          eventQueue.insert(newEventPoint, newEventPoint)
          output.insert(newEventPoint, newEventPoint)
        },
      ),
    )
