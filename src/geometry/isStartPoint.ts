type Payload = {
  segment: Segment,
  point: Point
}

export const isStartPoint =
  ({ segment: { start }, point }: Payload): boolean =>
    Math.abs(point.x - start.x) < Number.EPSILON &&
    Math.abs(point.y - start.y) < Number.EPSILON
