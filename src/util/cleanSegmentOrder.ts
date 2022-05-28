import { comparePointAsc } from '../comparator/comparePointAsc'

export const cleanSegmentOrder =
  ({ start: startPoint, end: endPoint }: Segment): Segment =>
    comparePointAsc(startPoint, endPoint) > 0
      ? { start: endPoint, end: startPoint }
      : { start: startPoint, end: endPoint }
