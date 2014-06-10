import Segment = require("classes/element/segment/Segment");

export = SegmentRenderer;
class SegmentRenderer {
    Segment: Segment;
    SegmentRenderer1: SegmentRenderer;
    SegmentRenderer2: SegmentRenderer;
    IsCorner: boolean;
    IsIndependantShape: boolean;

    constructor (segment: Segment, representCorner: boolean) {
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