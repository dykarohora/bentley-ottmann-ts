declare module 'rat-vec/add' {
  import { ratVec } from 'rat-vec'

  declare function add(a: ratVec.Vector, b: ratVec.Vector): ratVec.Vector

  export = add
}
