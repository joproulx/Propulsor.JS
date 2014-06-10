var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "classes/element/renderer/SegmentRenderer"], function(require, exports, SegmentRenderer) {
    
    var LineSegmentRenderer = (function (_super) {
        __extends(LineSegmentRenderer, _super);
        function LineSegmentRenderer(lineSegment) {
            _super.call(this, lineSegment, false);
        }
        LineSegmentRenderer.prototype.render = function (t, context, startRatio, endRatio) {
            var point;
            if (arguments.length > 2 && endRatio < 1) {
                point = this.Segment.pointFromRatio(t, endRatio);
            } else {
                point = this.Segment.Joint2.getPosition(t);
            }
            context.lineTo(point.X, point.Y);
        };
        LineSegmentRenderer.prototype.getPoint1 = function (t, startRatio, endRatio) {
            if (arguments.length > 1 && startRatio > 0) {
                return this.Segment.pointFromRatio(t, startRatio);
            }
            return this.Segment.Joint1.getPosition(t);
        };
        LineSegmentRenderer.prototype.getPoint2 = function (t, startRatio, endRatio) {
            if (arguments.length > 1 && endRatio < 1) {
                return this.Segment.pointFromRatio(t, endRatio);
            }
            return this.Segment.Joint2.getPosition(t);
        };
        return LineSegmentRenderer;
    })(SegmentRenderer);
    return LineSegmentRenderer;
});
//# sourceMappingURL=LineSegmentRenderer.js.map
