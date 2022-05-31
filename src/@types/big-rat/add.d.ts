declare module 'big-rat/add' {
  import { bigRat } from 'big-rat'

  declare function add(a: bigRat.Rat, b: bigRat.Rat): bigRat.Rat

  export = add
}
