import { compareFloatAsc } from './compareFloatAsc'

describe('compareFloatAsc関数のテスト', () => {
  it.each([
    [0, 1, -1],
    [1, 0, 1],
    [1, 1, 0],
    // 浮動小数点数の誤差を考慮
    [0.1, (0.3-0.2), 0]
  ])('%sと%sを比較すると結果は%sとなる', (a, b, expected) => {
    expect(compareFloatAsc(a, b)).toBe(expected)
  })
})
