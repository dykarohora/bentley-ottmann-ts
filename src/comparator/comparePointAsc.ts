import { compareFloatAsc } from './compareFloatAsc'

export const comparePointAsc =
  (a: Point, b: Point): number =>
    compareFloatAsc(a.x, b.x) || compareFloatAsc(a.y, b.y)
