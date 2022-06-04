import rat from 'big-rat'
import add from 'big-rat/add'
import sub from 'big-rat/sub'
import mul from 'big-rat/mul'
import div from 'big-rat/div'

import toFloat from 'big-rat/to-float'
import { pipe } from 'fp-ts/function'

import { SweepLine } from '../bentley-ottman/sweepLine'

/**
 * 現在の走査線の位置における線分のY座標を返す。
 * 線分が走査線よりも前にある場合は始点のY座標を、
 * 線分が走査線よりも後ろにある場合は終点のY座標を、
 * 線分が走査線と交差している場合は走査線と線分の交点のY座標を返す。
 *
 * 線分の端点について、左下にあるものが始点となっていることが事前条件。
 * @param start
 * @param end
 * @param sweepLineXCoord
 */
const getYCoord =
  ({ start, end }: Segment, sweepLineXCoord: number): number => {
    // 走査線と線分が交差していない
    if (sweepLineXCoord <= start.x) {
      return start.y
    }

    if (end.x <= sweepLineXCoord) {
      return end.y
    }

    const ratStartX = rat(start.x)
    const ratEndX = rat(end.x)
    const ratSweepLineX = rat(sweepLineXCoord)

    const ratio = pipe(
      [sub(ratSweepLineX, ratStartX), sub(ratEndX, ratStartX)] as const,
      (elem) => div(...elem),
    )
    const iRatio = sub(rat(1.0), ratio)

    const ratStartY = rat(start.y)
    const ratEndY = rat(end.y)

    return pipe(
      [mul(iRatio, ratStartY), mul(ratio, ratEndY)] as const,
      (elem) => add(...elem),
      toFloat,
    )
  }

/**
 * 線分の傾きを取得する
 * @param segment
 */
const getSlope =
  (segment: Segment): number => {
    // 線分がY軸に平行であるとき
    if (Math.abs(segment.start.x - segment.end.y) < Number.EPSILON) {
      return segment.start.y < segment.end.y ? Infinity : -Infinity
    }

    const startX = rat(segment.start.x)
    const startY = rat(segment.start.y)
    const endX = rat(segment.end.x)
    const endY = rat(segment.end.y)

    return pipe(
      [sub(endY, startY), sub(endX, startX)] as const,
      (elem) => div(...elem),
      toFloat,
    )
  }

/**
 * 2つの線分の順序を判定する。
 * 現在の走査線上において、y座標が小さい方を前とする。
 * @param sweepLine
 */
export const compareSegmentAscBySweepLine =
  (sweepLine: SweepLine) =>
    (a: Segment, b: Segment): number => {
      if (a === b) {
        return 0
      }

      // 走査線と各線分の交点を算出する
      // 走査線はY軸と平行（＝交点のx座標は走査線のx座標）なので、
      // 各線分の交点のy座標が一致するということは、2つの線分と走査線は一点で交差していることとなる
      const ay = getYCoord(a, sweepLine.xCoord)
      const by = getYCoord(b, sweepLine.xCoord)
      const deltaY = ay - by

      // 3つの線分が交差していないときはY座標の位置から判定する
      if (Math.abs(deltaY) > Number.EPSILON) {
        return deltaY < 0 ? -1 : 1
      }

      // 3つ線分が交差している場合は傾きから順序を判定する
      const aSlope = getSlope(a)
      const bSlope = getSlope(b)

      // 傾きに差がある
      if (Math.abs(aSlope - bSlope) > Number.EPSILON) {
        // 交差において交点の左側を基準に判定する場合は傾きが大きい方が前方となる
        // 右側では逆になる
        switch (sweepLine.phase) {
          case 'backward':
            return aSlope > bSlope ? -1 : 1
          case 'forward':
            return aSlope > bSlope ? 1 : -1
        }
      }

      return 0
    }
