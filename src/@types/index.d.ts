export {}

declare global {
  type Point = {
    x: number
    y: number
  }

  type EventPoint =
    {
      type: 'start' | 'end' | 'intersection'
      segments: SegmentWithId[]
    } & Point

  type Segment = {
    start: Point
    end: Point
  }

}

