define(["require", "exports", "classes/common/Point"], function(require, exports, Point) {
    

    // Immutable type
    var Line = (function () {
        function Line(slope, offsetY) {
            this.m_slope = slope;
            this.m_offsetY = offsetY;
        }
        Line.fromSegment = function (point1, point2) {
            var slope = (point2.Y - point1.Y) / (point2.X - point1.X);
            var offsetY = point2.Y - slope * point2.X;

            return new Line(slope, offsetY);
        };
        Line.prototype.getOffsetY = function () {
            return this.m_offsetY;
        };
        Line.prototype.getSlope = function () {
            return this.m_slope;
        };
        Line.prototype.getPoints = function (point, length) {
            var points = [];
            var x, y;
            if (this.getSlope() != Infinity) {
                var angle = Math.atan(this.getSlope());
                y = point.Y + length * Math.sin(angle);
                x = point.X + length * Math.cos(angle);
                points.push(new Point(x, y));

                y = point.Y + -length * Math.sin(angle);
                x = point.X + -length * Math.cos(angle);
                points.push(new Point(x, y));
            } else {
                y = point.Y + length;
                x = point.X;
                points.push(new Point(x, y));

                y = point.Y - length;
                x = point.X;
                points.push(new Point(x, y));
            }
            return points;
        };
        Line.prototype.getPerpendicularLine = function (point) {
            var slope = Infinity;
            var offsetY = undefined;

            if (this.getSlope() != 0) {
                slope = -1 / this.getSlope();
                offsetY = -1 * slope * point.X + point.Y;
            }

            return new Line(slope, offsetY);
        };
        Line.prototype.getIntersectionPoint = function (otherLine) {
            var x;
            var y;
            if (this.getSlope() == Infinity) {
                x = this.getOffsetY();
                y = otherLine.getSlope() * x + otherLine.getOffsetY();
            } else if (otherLine.getSlope() == Infinity) {
                x = otherLine.getOffsetY();
                y = this.getSlope() * x + this.getOffsetY();
            } else {
                x = (otherLine.getOffsetY() - this.getOffsetY()) / (this.getSlope() - otherLine.getSlope());
                y = this.getSlope() * x + this.getOffsetY();
            }
            return new Point(x, y);
        };
        return Line;
    })();
    return Line;
});
//# sourceMappingURL=Line.js.map
