declare module 'big-rat/div' {
  import { bigRat } from 'big-rat'

  declare function div(a: bigRat.Rat, b: bigRat.Rat): bigRat.Rat

  export = div
}
