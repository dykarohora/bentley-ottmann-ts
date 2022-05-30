declare module 'big-rat/to-float' {
  import { bigRat } from 'big-rat'

  declare function toFloat(value: bigRat.Rat): number

  export = toFloat
}
