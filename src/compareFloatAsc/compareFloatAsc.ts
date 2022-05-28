export const compareFloatAsc =
  (a: number, b: number): number => {
    if (a < b && Math.abs(a - b) > Number.EPSILON) {
      return -1
    }

    if (a > b && Math.abs(a - b) > Number.EPSILON) {
      return 1
    }

    return 0
  }
