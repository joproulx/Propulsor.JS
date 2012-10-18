import BezierSegment = module("scripts/element/segment/BezierSegment");
import SegmentRenderer = module("scripts/element/renderer/SegmentRenderer");

export class BezierSegmentRenderer extends SegmentRenderer.SegmentRenderer {
    Segment: BezierSegment.BezierSegment;

    constructor (bezierSegment: BezierSegment.BezierSegment) {
        super(bezierSegment, false);
    }
    render(t: number, context: any, startRatio: number, endRatio: number) {
        var point1 = this.getControlPoint1(t, startRatio, endRatio);
        var point2 = this.getControlPoint2(t, startRatio, endRatio);
        var point3 = this.getPoint2(t, startRatio, endRatio);
        context.bezierCurveTo(point1.X, point1.Y, point2.X, point2.Y, point3.X, point3.Y);
    }
    getPoint1(t: number, startRatio: number, endRatio: number) {
        // Todo: Memoize start and end ratio
        // Todo: Memoize getSubSegment
        if (arguments.length > 1 && startRatio != 0) {
            var points = this.Segment.getSubSegment(t, startRatio, endRatio);
            return points[0];
        }
        else {
            return this.Segment.Joint1.getPosition(t);
        }
    }
    getPoint2(t: number, startRatio: number, endRatio: number) {
        // Todo: Memoize start and end ratio
        // Todo: Memoize getSubSegment
        if (arguments.length > 1 && endRatio >= 0 && endRatio < 1) {
            var points = this.Segment.getSubSegment(t, startRatio, endRatio);
            return points[3];
        }
        else {
            return this.Segment.Joint2.getPosition(t);
        }
    }
    getControlPoint1(t: number, startRatio: number, endRatio: number) {
        // Todo: Memoize start and end ratio
        // Todo: Memoize getSubSegment
        if (arguments.length > 1 && (startRatio != 0 || endRatio != 1)) {
            var points = this.Segment.getSubSegment(t, startRatio, endRatio);
            return points[1];
        }
        else {
            return this.Segment.ControlPoint1.getPosition(t);
        }
    }
    getControlPoint2(t: number, startRatio: number, endRatio: number) {
        // Todo: Memoize start and end ratio
        // Todo: Memoize getSubSegment
        if (arguments.length > 1 && (startRatio != 0 || endRatio != 1)) {
            var points = this.Segment.getSubSegment(t, startRatio, endRatio);
            return points[2];
        }
        else {
            return this.Segment.ControlPoint2.getPosition(t);
        }
    }
}