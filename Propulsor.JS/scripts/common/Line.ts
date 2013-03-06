export import Point = module("common/Point");
export import TimedValue = module("common/timedValue/TimedValue");

export class Line {
    Point1 : TimedValue.TimedValue;
    Point2 : TimedValue.TimedValue;
    Slope: number;
    Offset: number;

    constructor(point1: TimedValue.TimedValue, point2: TimedValue.TimedValue, slope?: number, offset?: number) {
        this.Point1 = point1;
        this.Point2 = point2;
        this.Slope = slope;
        this.Offset = offset;
    }
    getOffset(t: number) {
        if (this.Offset === undefined) {
            var point1 = this.Point1.get(t);
            return point1.Y - this.getSlope(t) * point1.X;
        }
        return this.Offset;
    }
    getSlope(t: number) {
        if (this.Slope === undefined) {
            var point1 = this.Point1.get(t);
            var point2 = this.Point2.get(t);
            return (point2.Y - point1.Y) /
                    (point2.X - point1.X);
        }
        return this.Slope;
    }
    getPoints(t: number, point: Point.Point, length: number) {
        var points = [];
        var x, y;
        if (this.getSlope(t) != Infinity) {
            var angle = Math.atan(this.getSlope(t));
            y = point.Y + length * Math.sin(angle);
            x = point.X + length * Math.cos(angle);
            points.push(new Point.Point(x, y));

            y = point.Y + -length * Math.sin(angle);
            x = point.X + -length * Math.cos(angle);
            points.push(new Point.Point(x, y));
        }
        else {
            y = point.Y + length;
            x = point.X;
            points.push(new Point.Point(x, y));

            y = point.Y - length;
            x = point.X;
            points.push(new Point.Point(x, y));
        }
        return points;
    }
    getPerpendicularLine(t: number, point: Point.Point) {
        var slope = Infinity;
        var offset = point.X;

        if (this.getSlope(t) != 0) {
            slope = -1 / this.getSlope(t);
            offset = -1 * slope * point.X + point.Y;
        }

        if (slope === undefined || offset === undefined) {
            debugger;
        }

        return new Line(null, null, slope, offset);
    }
    getIntersectionPoint(t: number, otherLine: Line) {
        var x: number;
        var y: number;
        if (this.getSlope(t) == Infinity) {
            x = this.getOffset(t);
            y = otherLine.getSlope(t) * x + otherLine.getOffset(t);
        }
        else if (otherLine.getSlope(t) == Infinity) {
            x = otherLine.getOffset(t);
            y = this.getSlope(t) * x + this.getOffset(t);
        }
        else {
            x = (otherLine.getOffset(t) - this.getOffset(t)) / (this.getSlope(t) - otherLine.getSlope(t));
            y = this.getSlope(t) * x + this.getOffset(t);
        }
        return new Point.Point(x, y);
    }
}