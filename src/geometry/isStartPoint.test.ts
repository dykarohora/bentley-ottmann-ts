import { isStartPoint } from './isStartPoint'

describe('isStartPoint関数のテスト', () => {
  it.each([
    [{ x: 0, y: 0 }, { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }, true],
    [{ x: 0.1, y: 0 }, { start: { x: (0.3 - 0.2), y: 0 }, end: { x: 1, y: 1 } }, true],
    [{ x: 0, y: 0.1 }, { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }, false],
  ])('点%oは線分%oの始点かどうか:%s', (point, segment, expected) => {
    expect(isStartPoint({ point, segment })).toEqual(expected)
  })
})
