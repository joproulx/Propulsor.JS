var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports", "scripts/element/renderer/SegmentRenderer"], function(require, exports, __SegmentRenderer__) {
    
    var SegmentRenderer = __SegmentRenderer__;

    var BezierSegmentRenderer = (function (_super) {
        __extends(BezierSegmentRenderer, _super);
        function BezierSegmentRenderer(bezierSegment) {
                _super.call(this, bezierSegment, false);
        }
        BezierSegmentRenderer.prototype.render = function (t, context, startRatio, endRatio) {
            var point1 = this.getControlPoint1(t, startRatio, endRatio);
            var point2 = this.getControlPoint2(t, startRatio, endRatio);
            var point3 = this.getPoint2(t, startRatio, endRatio);
            context.bezierCurveTo(point1.X, point1.Y, point2.X, point2.Y, point3.X, point3.Y);
        };
        BezierSegmentRenderer.prototype.getPoint1 = function (t, startRatio, endRatio) {
            if(arguments.length > 1 && startRatio != 0) {
                var points = this.Segment.getSubSegment(t, startRatio, endRatio);
                return points[0];
            } else {
                return this.Segment.Joint1.getPosition(t);
            }
        };
        BezierSegmentRenderer.prototype.getPoint2 = function (t, startRatio, endRatio) {
            if(arguments.length > 1 && endRatio >= 0 && endRatio < 1) {
                var points = this.Segment.getSubSegment(t, startRatio, endRatio);
                return points[3];
            } else {
                return this.Segment.Joint2.getPosition(t);
            }
        };
        BezierSegmentRenderer.prototype.getControlPoint1 = function (t, startRatio, endRatio) {
            if(arguments.length > 1 && (startRatio != 0 || endRatio != 1)) {
                var points = this.Segment.getSubSegment(t, startRatio, endRatio);
                return points[1];
            } else {
                return this.Segment.ControlPoint1.getPosition(t);
            }
        };
        BezierSegmentRenderer.prototype.getControlPoint2 = function (t, startRatio, endRatio) {
            if(arguments.length > 1 && (startRatio != 0 || endRatio != 1)) {
                var points = this.Segment.getSubSegment(t, startRatio, endRatio);
                return points[2];
            } else {
                return this.Segment.ControlPoint2.getPosition(t);
            }
        };
        return BezierSegmentRenderer;
    })(SegmentRenderer.SegmentRenderer);
    exports.BezierSegmentRenderer = BezierSegmentRenderer;    
})

