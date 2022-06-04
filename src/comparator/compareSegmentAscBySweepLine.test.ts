import { initializeSweepLine } from '../bentley-ottman/sweepLine'
import { compareSegmentAscBySweepLine } from './compareSegmentAscBySweepLine'

describe('compareSegmentAsc関数のテスト', () => {
  const a: Segment = {
    start: { x: 0, y: 4 },
    end: { x: 3, y: 1 },
  }

  const b: Segment = {
    start: { x: 1, y: 1 },
    end: { x: 4, y: 4 },
  }

  it.each([
    [{ x: -1, phase: 'backward' } as const, 1],
    [{ x: 0, phase: 'backward' } as const, 1],
    [{ x: 1, phase: 'backward' } as const, 1],
    [{ x: 1.5, phase: 'backward' } as const, 1],
    [{ x: 2, phase: 'backward' } as const, 1],
    [{ x: 2, phase: 'forward' } as const, -1],
    [{ x: 2.5, phase: 'backward' } as const, -1],
    [{ x: 3, phase: 'backward' } as const, -1],
    [{ x: 4, phase: 'backward' } as const, -1],
    [{ x: 5, phase: 'backward' } as const, -1],
  ])('%s、%s', ({ x, phase }, expected) => {
    const sweepLine = initializeSweepLine(x)
    sweepLine.setPhase(phase)

    expect(compareSegmentAscBySweepLine(sweepLine)(a, b)).toEqual(expected)
  })

  it('test', () => {
    const segA: Segment = {
      start: { x: 1, y: 1 },
      end: { x: 1, y: 2 },
    }

    const segB: Segment = {
      start: { x: 1, y: 1 },
      end: { x: 4, y: 4 },
    }

    const sweepLine = initializeSweepLine(1)

    const result = compareSegmentAscBySweepLine(sweepLine)(segA, segB)

    console.log(result)
  })
})
