var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports", "scripts/element/renderer/LineSegmentRenderer", "scripts/element/segment/Segment", "scripts/common/Line", "scripts/common/Point", "scripts/scene/SceneNodePointAdapter"], function(require, exports, __LineSegmentRenderer__, __Segment__, __Line__, __Point__, __SceneNodePointAdapter__) {
    var LineSegmentRenderer = __LineSegmentRenderer__;

    var Segment = __Segment__;

    var Line = __Line__;

    
    var Point = __Point__;

    var SceneNodePointAdapter = __SceneNodePointAdapter__;

    var LineSegment = (function (_super) {
        __extends(LineSegment, _super);
        function LineSegment() {
                _super.call(this);
        }
        LineSegment.prototype.createSegmentRenderer = function () {
            return new LineSegmentRenderer.LineSegmentRenderer(this);
        };
        LineSegment.prototype.getSlope = function (t) {
            return this.Line.getSlope(t);
        };
        LineSegment.prototype.pointFromRatio = function (t, ratio) {
            var point1 = this.Joint1.getPosition(t);
            var point2 = this.Joint2.getPosition(t);
            return new Point.Point((ratio * point2.X + (1 - ratio) * point1.X), (ratio * point2.Y + (1 - ratio) * point1.Y));
        };
        LineSegment.prototype.setJoints = function (joint1, joint2) {
            _super.prototype.setJoints.call(this, joint1, joint2);
            this.Line = new Line.Line(new SceneNodePointAdapter.SceneNodePointAdapter(joint1.SceneNode), new SceneNodePointAdapter.SceneNodePointAdapter(joint2.SceneNode));
        };
        LineSegment.prototype.tangentAngleFromRatio = function (t, ratio) {
            var point1 = this.Joint1.getPosition(t);
            var point2 = this.Joint2.getPosition(t);
            return Math.atan2(point2.Y - point1.Y, point2.X - point1.X);
        };
        LineSegment.prototype.pointFromLength = function (t, length) {
            return this.pointFromRatio(t, length / this.length(t));
        };
        LineSegment.prototype.length = function (t) {
            var point1 = this.Joint1.getPosition(t);
            var point2 = this.Joint2.getPosition(t);
            return Math.sqrt(Math.pow(point2.Y - point1.Y, 2) + Math.pow(point2.X - point1.X, 2));
        };
        LineSegment.prototype.getPerpendicularLine = function (t, point) {
            return this.Line.getPerpendicularLine(t, point);
        };
        LineSegment.prototype.getIntersectionPoint = function (t, otherLine) {
            return this.Line.getIntersectionPoint(t, otherLine);
        };
        return LineSegment;
    })(Segment.Segment);
    exports.LineSegment = LineSegment;    
})

