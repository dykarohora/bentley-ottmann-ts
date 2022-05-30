import orient from 'robust-orientation'

const orient3 = orient[3]

/**
 * 直線P0P1と点P2の位置関係を判定する
 * 結果が正ならば、P2はP0P1の右側に
 * 負ならば、P2はP0P1の左側に
 * 0ならば、P2はP0P1上にある
 * @param p0
 * @param p1
 * @param p2
 */
export const robustOrientationAdapter =
  ({ start: p0, end: p1 }: Segment, p2: Point): number =>
    orient3([p0.x, p0.y], [p1.x, p1.y], [p2.x, p2.y])
