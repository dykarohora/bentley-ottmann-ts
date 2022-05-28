import { comparePointAsc } from './comparePointAsc'

describe('comparePoints関数のテスト', () => {
  it.each([
    [{ x: 0, y: 0 }, { x: 1, y: 1 }, -1],
    [{ x: 1, y: 1 }, { x: 0, y: 0 }, 1],
    [{ x: 0, y: 0 }, { x: 0, y: 1 }, -1],
    [{ x: 0, y: 1 }, { x: 0, y: 0 }, 1],
    [{ x: 0, y: 1 }, { x: 0, y: 1 }, 0],
    // 浮動小数点数演算による誤差を考慮できる
    [{ x: 0.1, y: 0 }, { x: (0.3 - 0.2), y: 2 }, -1],
    [{ x: 0.1, y: 0 }, { x: (0.3 - 0.2), y: -2 }, 1],
    [{ x: 0.1, y: 0 }, { x: (0.3 - 0.2), y: 0 }, 0],
    [{ x: 0, y: 0.1 }, { x: 0, y: (0.3 - 0.2) }, 0],
  ])('%oと%oを比較すると%s', (a, b, expected) => {
    expect(comparePointAsc(a, b)).toEqual(expected)
  })
})
