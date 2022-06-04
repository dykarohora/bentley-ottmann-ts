import { robustOrientationAdapter } from '../util/adapter/robustOrientationAdapter'

type Payload = {
  first: Segment,
  second: Segment
}

const checkCollinearCase =
  ({ first, second }: Payload): boolean => {
    const s1LowX = Math.min(first.start.x, first.end.x)
    const s1HighX = Math.max(first.start.x, first.end.x)

    const s2LowX = Math.min(second.start.x, second.end.x)
    const s2HighX = Math.max(second.start.x, second.end.x)

    const s1LowY = Math.min(first.start.y, first.end.y)
    const s1HighY = Math.max(first.start.y, first.end.y)

    const s2LowY = Math.min(second.start.y, second.end.y)
    const s2HighY = Math.max(second.start.y, second.end.y)

    return !(s1HighX < s2LowX || s2HighX < s1LowX || s1HighY < s2LowY || s2HighY < s1LowY)
  }

export const isIntersectSegments =
  ({ first, second }: Payload): boolean => {
    const s1StartCW = robustOrientationAdapter(second, first.start)
    const s1EndCW = robustOrientationAdapter(second, first.end)

    if ((s1StartCW > 0 && s1EndCW > 0) || (s1StartCW < 0 && s1EndCW < 0)) {
      return false
    }

    const s2StartCW = robustOrientationAdapter(first, second.start)
    const s2EndCW = robustOrientationAdapter(first, second.end)

    if ((s2StartCW > 0 && s2EndCW > 0) || (s2StartCW < 0 && s2EndCW < 0)) {
      return false
    }

    if (s1StartCW === 0 && s1EndCW === 0 && s2StartCW === 0 && s2EndCW === 0) {
      return checkCollinearCase({ first, second })
    }

    return true
  }
