declare module 'rat-vec/muls' {
  import { bigRat } from 'big-rat'
  import { ratVec } from 'rat-vec'

  declare function muls(v: ratVec.Vector, x: number | bigRat.Rat): ratVec.Vector

  export = muls
}
