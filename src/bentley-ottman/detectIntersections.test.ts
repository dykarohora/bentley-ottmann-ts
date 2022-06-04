import { detectIntersections } from './detectIntersections'

it('test', () => {
  const segments: Segment[] = [
    { start: { x: 0, y: 0 }, end: { x: 6, y: 6 } },
    { start: { x: 0, y: 6 }, end: { x: 6, y: 0 } },
  ]

  const result = detectIntersections(segments)

  expect(result.length).toEqual(1)
  expect(result[0]).toEqual({ x: 3, y: 3 })
})
