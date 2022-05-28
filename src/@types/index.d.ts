export {}

declare global {
  type Point = {
    x: number
    y: number
  }

  type EventPoint =
    {
      type: 'start' | 'end' | 'intersection'
      segmentId: number
      segments: SegmentWithId[]
    } & Point

  type Segment = {
    start: Point
    end: Point
  }

  type SegmentWithId = {
    start: Point & { segmentId: number }
    end: Point & { segmentId: number }
  }

}

