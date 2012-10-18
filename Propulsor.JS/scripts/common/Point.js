define(["require", "exports"], function(require, exports) {
    var Point = (function () {
        function Point(x, y) {
            this.X = x;
            this.Y = y;
        }
        Point.prototype.copy = function (copyValue) {
            this.X = copyValue.X;
            this.Y = copyValue.Y;
        };
        Point.prototype.clone = function () {
            var newPoint = new Point();
            newPoint.copy(this);
            return newPoint;
        };
        Point.prototype.distanceFrom = function (otherPoint) {
            return Math.sqrt(Math.pow(otherPoint.Y - this.Y, 2) + Math.pow(otherPoint.X - this.X, 2));
        };
        Point.prototype.minus = function (otherPoint) {
            return new Point(this.X - otherPoint.X, this.Y - otherPoint.Y);
        };
        Point.prototype.equals = function (other) {
            return other.X == this.X && other.Y == this.Y;
        };
        Point.prototype.toString = function () {
            return this.X + ", " + this.Y;
        };
        Point.prototype.multiplyBy = function (value) {
            return new Point(this.X * value, this.Y * value);
        };
        Point.prototype.x = function (value) {
            return this.multiplyBy(value);
        };
        Point.prototype.add = function (point) {
            return new Point(this.X + point.X, this.Y + point.Y);
        };
        return Point;
    })();
    exports.Point = Point;    
})

