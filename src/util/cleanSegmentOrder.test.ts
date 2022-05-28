import { cleanSegmentOrder } from './cleanSegmentOrder'

describe('cleanSegmentOrder関数のテスト', () => {
  it('始点が終点よりも左にある場合は、始点と終点の入れ替えが発生する', () => {
    const segment: Segment = {
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    }

    const result = cleanSegmentOrder(segment)

    expect(result).toEqual(segment)
  })

  it('始点が終点よりも右にある場合は、始点と終点が入れ替えられる', () => {
    const segment: Segment = {
      start: { x: 1, y: 1 },
      end: { x: 0, y: 0 },
    }

    const result = cleanSegmentOrder(segment)

    const expected: Segment = {
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    }

    expect(result).toEqual(expected)
  })

  it('始点と終点がy軸に平行で始点が終点よりも下にある場合は、入れ替えは発生しない', () => {
    const segment: Segment = {
      start: { x: 1, y: 0 },
      end: { x: 1, y: 1 },
    }

    const result = cleanSegmentOrder(segment)

    expect(result).toEqual(segment)
  })

  it('始点と終点がy軸に平行で始点が終点よりも上にある場合は、入れ替えが発生する', () => {
    const segment: Segment = {
      start: { x: 1, y: 1 },
      end: { x: 1, y: 0 },
    }

    const result = cleanSegmentOrder(segment)

    const expected: Segment = {
      start: { x: 1, y: 0 },
      end: { x: 1, y: 1 },
    }

    expect(result).toEqual(expected)
  })
})
