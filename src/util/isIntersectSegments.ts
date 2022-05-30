import { robustOrientationAdapter } from './adapter/robustOrientationAdapter'

const checkCollinearCase =
  (s1: Segment, s2: Segment): boolean => {
    const s1LowX = Math.min(s1.start.x, s1.end.x)
    const s1HighX = Math.max(s1.start.x, s1.end.x)

    const s2LowX = Math.min(s2.start.x, s2.end.x)
    const s2HighX = Math.max(s2.start.x, s2.end.x)

    const s1LowY = Math.min(s1.start.y, s1.end.y)
    const s1HighY = Math.max(s1.start.y, s1.end.y)

    const s2LowY = Math.min(s2.start.y, s2.end.y)
    const s2HighY = Math.max(s2.start.y, s2.end.y)

    return !(s1HighX < s2LowX || s2HighX < s1LowX || s1HighY < s2LowY || s2HighY < s1LowY)
  }

export const isIntersectSegments =
  (s1: Segment, s2: Segment): boolean => {
    const s1StartCW = robustOrientationAdapter(s2, s1.start)
    const s1EndCW = robustOrientationAdapter(s2, s1.end)

    if ((s1StartCW > 0 && s1EndCW > 0) || (s1StartCW < 0 && s1EndCW < 0)) {
      return false
    }

    const s2StartCW = robustOrientationAdapter(s1, s2.start)
    const s2EndCW = robustOrientationAdapter(s1, s2.end)

    if ((s2StartCW > 0 && s2EndCW > 0) || (s2StartCW < 0 && s2EndCW < 0)) {
      return false
    }

    if (s1StartCW === 0 && s1EndCW === 0 && s2StartCW === 0 && s2EndCW === 0) {
      return checkCollinearCase(s1, s2)
    }

    return true
  }
