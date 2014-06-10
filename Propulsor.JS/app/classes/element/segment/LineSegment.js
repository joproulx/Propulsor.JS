var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "classes/element/renderer/LineSegmentRenderer", "classes/element/segment/Segment", "classes/common/Line", "classes/common/Point"], function(require, exports, LineSegmentRenderer, Segment, Line, Point) {
    
    var LineSegment = (function (_super) {
        __extends(LineSegment, _super);
        function LineSegment() {
            _super.call(this);
        }
        LineSegment.prototype.createSegmentRenderer = function () {
            return new LineSegmentRenderer(this);
        };
        LineSegment.prototype.getJointPosition1 = function (t) {
            return this.Joint1.getPosition(t);
        };
        LineSegment.prototype.getJointPosition2 = function (t) {
            return this.Joint2.getPosition(t);
        };
        LineSegment.prototype.getLine = function (t) {
            // TODO: Cache the line to avoid calculate slope every time
            return Line.fromSegment(this.getJointPosition1(t), this.getJointPosition2(t));
        };
        LineSegment.prototype.getSlope = function (t) {
            return this.getLine(t).getSlope();
        };
        LineSegment.prototype.pointFromRatio = function (t, ratio) {
            var point1 = this.Joint1.getPosition(t);
            var point2 = this.Joint2.getPosition(t);
            return new Point((ratio * point2.X + (1 - ratio) * point1.X), (ratio * point2.Y + (1 - ratio) * point1.Y));
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
            return this.getLine(t).getPerpendicularLine(point);
        };
        LineSegment.prototype.getIntersectionPoint = function (t, otherLine) {
            return this.getLine(t).getIntersectionPoint(otherLine);
        };
        return LineSegment;
    })(Segment);
    return LineSegment;
});
//# sourceMappingURL=LineSegment.js.map
