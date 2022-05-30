declare module 'big-rat/sign' {
  import { bigRat } from 'big-rat'

  declare function sign(a: bigRat.Rat): number

  export = sign
}
