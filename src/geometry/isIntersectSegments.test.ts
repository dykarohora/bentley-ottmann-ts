import { isIntersectSegments } from './isIntersectSegments'

describe('intersectsSegment関数のテスト', () => {
  it.each([
    [{ start: { x: -1, y: 0 }, end: { x: 1, y: 0 } }, { start: { x: 0, y: -1 }, end: { x: 0, y: 1 } }, true],
    [{ start: { x: 0.5, y: 0 }, end: { x: 1, y: 0 } }, { start: { x: 0, y: -1 }, end: { x: 0, y: 1 } }, false],
    // Tジャンクション
    [{ start: { x: 0, y: 0 }, end: { x: 1, y: 0 } }, { start: { x: 0, y: -1 }, end: { x: 0, y: 1 } }, true],
    [{ start: { x: 0, y: 0 }, end: { x: 0, y: 0 } }, { start: { x: 0, y: -1 }, end: { x: 0, y: 1 } }, true],
    [{ start: { x: 0, y: 0 }, end: { x: 1, y: 0 } }, { start: { x: 0, y: -1 }, end: { x: 0, y: 1 } }, true],
    // 微小
    [
      { start: { x: 0, y: 0 }, end: { x: 100000000000000020000, y: 1e-12 } },
      { start: { x: 1, y: 0 }, end: { x: 1e20, y: 1e-11 } },
      true,
    ],
    [
      { start: { x: 0, y: 0 }, end: { x: 1e20, y: 1e-12 } },
      { start: { x: 1, y: 0 }, end: { x: 100000000000000020000, y: 1e-12 } },
      false,
    ],
    // 4点が一直線上にある
    [{ start: { x: 1, y: 1 }, end: { x: 2, y: 2 } }, { start: { x: -1, y: -1 }, end: { x: -2, y: -2 } }, false],
    [{ start: { x: 1, y: 0 }, end: { x: 2, y: 0 } }, { start: { x: -1, y: 0 }, end: { x: -2, y: 0 } }, false],
    [{ start: { x: 0, y: 1 }, end: { x: 0, y: 2 } }, { start: { x: 0, y: -1 }, end: { x: 0, y: -2 } }, false],

    [{ start: { x: 1, y: 1 }, end: { x: 2, y: 2 } }, { start: { x: 1.5, y: 1.5 }, end: { x: -2, y: -2 } }, true],
    [{ start: { x: 1, y: 0 }, end: { x: 2, y: 0 } }, { start: { x: 1.5, y: 0 }, end: { x: -2, y: 0 } }, true],
    [{ start: { x: 0, y: 1 }, end: { x: 0, y: 2 } }, { start: { x: 0, y: 1.5 }, end: { x: 0, y: -2 } }, true],

    [{ start: { x: 1, y: 1 }, end: { x: 2, y: 2 } }, { start: { x: 1, y: 1 }, end: { x: -2, y: -2 } }, true],
    [{ start: { x: 1, y: 0 }, end: { x: 2, y: 0 } }, { start: { x: 1, y: 0 }, end: { x: -2, y: 0 } }, true],
    [{ start: { x: 0, y: 1 }, end: { x: 0, y: 2 } }, { start: { x: 0, y: 1 }, end: { x: 0, y: -2 } }, true],

    [{ start: { x: 1, y: 1 }, end: { x: -1, y: -1 } }, { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }, true],
    [{ start: { x: 1, y: 0 }, end: { x: -1, y: 0 } }, { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } }, true],
    [{ start: { x: 0, y: 1 }, end: { x: 0, y: -1 } }, { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } }, true],
  ])('線分%oと線分%oの衝突判定の結果は%s', (first, second, expected) => {
    expect(isIntersectSegments({ first, second })).toBe(expected)
  })
})
