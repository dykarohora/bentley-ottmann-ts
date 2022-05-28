import AVLTree from 'avl'
import { comparePointAsc } from '../comparator/comparePointAsc'

export const setInitialEventPoint =
  (segments: Segment[]) => {
    const eventQueue = new AVLTree(comparePointAsc, true)

    segments.forEach(
      (segment, index) => {

      }
    )
  }
