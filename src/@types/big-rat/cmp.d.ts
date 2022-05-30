declare module 'big-rat/cmp' {
  import { bigRat } from 'big-rat'

  declare function cmp(a: bigRat.Rat, b: bigRat.Rat): number

  export = cmp
}
