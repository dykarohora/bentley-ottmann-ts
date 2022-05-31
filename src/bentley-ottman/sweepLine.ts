class SweepLine {
  public constructor(
    private position: number,
    private p: 'forward' | 'backward',
  ) {
  }

  public get xCoord(): number {
    return this.position
  }

  public setXCoord(xCoord: number): void {
    this.position = xCoord
  }

  public get phase(): 'forward' | 'backward' {
    return this.p
  }

  public setPhase(phase: 'forward' | 'backward'): void {
    this.p = phase
  }
}

export const initializeSweepLine =
  (xCoord: number): SweepLine => new SweepLine(xCoord, 'backward')

export type { SweepLine }
