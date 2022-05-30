declare module 'rat-vec' {
  import { bigRat } from 'big-rat'

  export declare namespace ratVec {
    type Vector = bigRat.Rat[]
  }

  declare function ratVector(v: number[] | bigRat.Rat[]): ratVec.Vector

  export = ratVector
}
