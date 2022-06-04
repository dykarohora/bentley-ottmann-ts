import { robustOrientationAdapter } from '../util/adapter/robustOrientationAdapter'

type Payload = {
  segment: Segment,
  point: Point
}

export const isPointOnSegment =
  ({ segment, point }: Payload): boolean =>
    Math.abs(robustOrientationAdapter(segment, point)) > Number.EPSILON
      ? false
      : Math.min(segment.start.x, segment.end.x) <= point.x
      && Math.max(segment.start.x, segment.end.x) >= point.x
      && Math.min(segment.start.y, segment.end.y) <= point.y
      && Math.max(segment.start.y, segment.end.y) >= point.y
