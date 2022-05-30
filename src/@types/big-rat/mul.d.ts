declare module 'big-rat/mul' {
  import { bigRat } from 'big-rat'

  declare function mul(a: bigRat.Rat, b: bigRat.Rat): bigRat.Rat

  export = mul
}
