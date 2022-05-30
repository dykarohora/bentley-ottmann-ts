declare module 'big-rat' {
  import BN from 'bn.js'

  export declare namespace bigRat {
    type Rat = [BN, BN]
  }

  declare function rat(num: number, denom?: number): bigRat.Rat

  export = rat
}
