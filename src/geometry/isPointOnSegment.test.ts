import { isPointOnSegment } from './isPointOnSegment'

describe('isPointOnSegment関数のテスト', () => {
  it.each([
    [{ x: 3, y: 3 }, { start: { x: 0, y: 0 }, end: { x: 5, y: 5 } }, true],
    [{ x: 3, y: 3 }, { start: { x: 0, y: 6 }, end: { x: 6, y: 0 } }, true],
    [{ x: 3, y: 0 }, { start: { x: 0, y: 0 }, end: { x: 6, y: 0 } }, true],
    [{ x: 0, y: 3 }, { start: { x: 0, y: 0 }, end: { x: 0, y: 6 } }, true],
    [{ x: -1, y: -1 }, { start: { x: 0, y: 0 }, end: { x: 5, y: 5 } }, false],
    [{ x: 6, y: 6 }, { start: { x: 0, y: 0 }, end: { x: 5, y: 5 } }, false],
    [{ x: -1, y: 7 }, { start: { x: 0, y: 6 }, end: { x: 6, y: 0 } }, false],
    [{ x: 7, y: -1 }, { start: { x: 0, y: 6 }, end: { x: 6, y: 0 } }, false],
    [{ x: -1, y: 0 }, { start: { x: 0, y: 0 }, end: { x: 6, y: 0 } }, false],
    [{ x: 7, y: 0 }, { start: { x: 0, y: 0 }, end: { x: 6, y: 0 } }, false],
    [{ x: 0, y: -1 }, { start: { x: 0, y: 0 }, end: { x: 0, y: 6 } }, false],
    [{ x: 0, y: 7 }, { start: { x: 0, y: 0 }, end: { x: 0, y: 6 } }, false],
  ])('点%oが線分%o上に存在するかは%s', (point, segment, expected) => {
    expect(isPointOnSegment({ point, segment })).toEqual(expected)
  })
})
