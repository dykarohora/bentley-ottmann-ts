import { Option } from 'fp-ts/Option'
import * as O from 'fp-ts/Option'

import { bigRat } from 'big-rat'
import ratSub from 'big-rat/sub'
import ratMul from 'big-rat/mul'
import ratDiv from 'big-rat/div'
import ratSign from 'big-rat/sign'

import ratVector, { ratVec } from 'rat-vec'
import vecAdd from 'rat-vec/add'
import vecSub from 'rat-vec/sub'
import vecMuls from 'rat-vec/muls'
import toFloat from 'big-rat/to-float'

const ratCrossProduct =
  (a: ratVec.Vector, b: ratVec.Vector): bigRat.Rat => {
    if (
      a[0] === undefined ||
      a[1] === undefined ||
      b[0] === undefined ||
      b[1] === undefined
    ) {
      throw new Error('Application Bug')
    }

    return ratSub(ratMul(a[0], b[1]), ratMul(a[1], b[0]))
  }

type Payload = {
  first: Segment,
  second: Segment
}

/**
 * 2つの線分の交点を計算する。
 * 線分が平行であった場合はOption.noneを返す。
 *
 * 事前条件は2つの線分が交差していること。
 * @param first
 * @param second
 */
export const calculateIntersectionPoint =
  ({ first, second }: Payload): Option<Point> => {
    // 交点cが線分をt:1-tに分割しているとすると、
    // 交点はt*線分のベクトルとなる、すなわち
    // c = s1.p1 + (s1.p2-s1.p1) * t (p1は線分の始点、p2は線分の終点)
    //
    // 交点は線分上の点であるため
    // (c-s2.p2) x (s2.p2 - s2.p.1) = 0
    // cを代入し、外積の分配則を適用するとtが算出できる

    const s2StartPos = ratVector([second.start.x, second.start.y])
    const s2EndPos = ratVector([second.end.x, second.end.y])
    const baseVec = vecSub(s2EndPos, s2StartPos)

    const s1StartPos = ratVector([first.start.x, first.start.y])
    const s1EndPos = ratVector([first.end.x, first.end.y])
    const s1Vec = vecSub(s1EndPos, s1StartPos)

    const crossProductS1AndBase = ratCrossProduct(s1Vec, baseVec)

    // S1とS2が平行である場合
    if (ratSign(crossProductS1AndBase) === 0) {
      return O.none
    }

    const hypoVector = vecSub(s1StartPos, s2StartPos)
    const crossProductBaseAndHypo = ratCrossProduct(baseVec, hypoVector)

    const t = ratDiv(crossProductBaseAndHypo, crossProductS1AndBase)
    const [x, y] = vecAdd(s1StartPos, vecMuls(s1Vec, t))

    if (x === undefined || y === undefined) {
      throw new Error('Application Bug')
    }

    return O.some({ x: toFloat(x), y: toFloat(y) })
  }
