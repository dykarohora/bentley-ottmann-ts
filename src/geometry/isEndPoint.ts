type Payload = {
  segment: Segment,
  point: Point
}

export const isEndPoint =
  ({ segment: { end }, point }: Payload): boolean =>
    Math.abs(point.x - end.x) < Number.EPSILON &&
    Math.abs(point.y - end.y) < Number.EPSILON
