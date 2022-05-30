import * as O from 'fp-ts/Option'
import { constVoid, identity, pipe } from 'fp-ts/function'

import { calculateIntersectionPoint } from './calculateIntersectionPoint'

describe('getCrossPoint関数のテスト', () => {
  it.each([
    [
      { start: { x: -1, y: 0 }, end: { x: 1, y: 0 } },
      { start: { x: 0, y: -1 }, end: { x: 0, y: 1 } },
      { x: 0, y: 0 },
    ],
    // Tジャンクション
    [
      { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
      { start: { x: 0, y: -1 }, end: { x: 0, y: 1 } },
      { x: 0, y: 0 },
    ],
    // 線分が平行
    [{ start: { x: 1, y: 1 }, end: { x: 2, y: 2 } }, { start: { x: 1.5, y: 1.5 }, end: { x: -2, y: -2 } }, undefined],
    [{ start: { x: 1, y: 0 }, end: { x: 2, y: 0 } }, { start: { x: 1.5, y: 0 }, end: { x: -2, y: 0 } }, undefined],
    [{ start: { x: 0, y: 1 }, end: { x: 0, y: 2 } }, { start: { x: 0, y: 1.5 }, end: { x: 0, y: -2 } }, undefined],
    [{ start: { x: 1, y: 1 }, end: { x: 2, y: 2 } }, { start: { x: 1, y: 1 }, end: { x: -2, y: -2 } }, undefined],
    [{ start: { x: 1, y: 0 }, end: { x: 2, y: 0 } }, { start: { x: 1, y: 0 }, end: { x: -2, y: 0 } }, undefined],
    [{ start: { x: 0, y: 1 }, end: { x: 0, y: 2 } }, { start: { x: 0, y: 1 }, end: { x: 0, y: -2 } }, undefined],
    [{ start: { x: 1, y: 1 }, end: { x: -1, y: -1 } }, { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }, undefined],
    [{ start: { x: 1, y: 0 }, end: { x: -1, y: 0 } }, { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } }, undefined],
    [{ start: { x: 0, y: 1 }, end: { x: 0, y: -1 } }, { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } }, undefined],
    // 微小
    [
      { start: { x: 0, y: 0 }, end: { x: 100000000000000020000, y: 1e-12 } },
      { start: { x: 1, y: 0 }, end: { x: 1e20, y: 1e-11 } },
      { x: 1.1111111111111112, y: 1.1111111111111109e-32 },
    ],
  ])('線分%oと線分%oの交点は%o', (s1, s2, crossPoint) => {
    const result = pipe(
      calculateIntersectionPoint(s1, s2),
      O.foldW(
        constVoid,
        identity,
      ),
    )

    expect(result).toEqual(crossPoint)
  })
})
