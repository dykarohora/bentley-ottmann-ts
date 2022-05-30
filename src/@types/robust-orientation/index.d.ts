declare module 'robust-orientation' {
  declare function orient0(): number

  declare function orient1(): number

  declare function orient2(
    p0: Tuple<number, 2>,
    p1: Tuple<number, 2>,
  ): number

  declare function orient3(
    p0: Tuple<number, 2>,
    p1: Tuple<number, 2>,
    p2: Tuple<number, 2>,
  ): number

  declare function orient4(
    p0: Tuple<number, 2>,
    p1: Tuple<number, 2>,
    p2: Tuple<number, 2>,
    p3: Tuple<number, 2>,
  ): number


  export = [orient0, orient1, orient2, orient3, orient4] as const
}
