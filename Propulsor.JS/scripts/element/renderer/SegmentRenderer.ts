import Segment = module("element/segment/Segment");

export class SegmentRenderer {
    Segment: Segment.Segment;
    SegmentRenderer1: SegmentRenderer;
    SegmentRenderer2: SegmentRenderer;
    IsCorner: bool;
    IsIndependantShape: bool;

    constructor (segment: Segment.Segment, representCorner: bool) {
        this.Segment = segment;
        this.IsCorner = representCorner;
        this.SegmentRenderer1 = null;
        this.SegmentRenderer2 = null;
    }
    setAttachedSegments(segmentRenderer1: SegmentRenderer, segmentRenderer2: SegmentRenderer) {
        this.SegmentRenderer1 = segmentRenderer1;
        this.SegmentRenderer2 = segmentRenderer2;
    }
    render(t: number, context: any, startRatio: number, endRatio: number) {

    }
    getPoint1(t: number, startRatio: number, endRatio: number) {
        return null;
    }
    getPoint2(t: number, startRatio: number, endRatio: number) {
        return null;
    }
}