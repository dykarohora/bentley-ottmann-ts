declare module 'big-rat/sub' {
  import { bigRat } from 'big-rat'

  declare function sub(a: bigRat.Rat, b: bigRat.Rat): bigRat.Rat

  export = sub
}
