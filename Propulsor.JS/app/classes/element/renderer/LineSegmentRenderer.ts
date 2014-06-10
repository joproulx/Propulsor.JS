import Point = require("classes/common/Point");
import LineSegment = require("classes/element/segment/LineSegment");
import SegmentRenderer = require("classes/element/renderer/SegmentRenderer");

export = LineSegmentRenderer;
class LineSegmentRenderer extends SegmentRenderer {
    constructor (lineSegment: LineSegment) {
        super(lineSegment, false);
    }
    render(t: number, context: any, startRatio: number, endRatio: number) {
        var point;
        if (arguments.length > 2 && endRatio < 1) {
            point = this.Segment.pointFromRatio(t, endRatio);
        }
        else {
            point = this.Segment.Joint2.getPosition(t);
        }
        context.lineTo(point.X, point.Y);
    }
    getPoint1(t: number, startRatio: number, endRatio: number): Point {
        if (arguments.length > 1 && startRatio > 0) {
            return this.Segment.pointFromRatio(t, startRatio);
        }
        return this.Segment.Joint1.getPosition(t);
    }
    getPoint2(t: number, startRatio: number, endRatio: number): Point {
        if (arguments.length > 1 && endRatio < 1) {
            return this.Segment.pointFromRatio(t, endRatio);
        }
        return this.Segment.Joint2.getPosition(t);
    }
}