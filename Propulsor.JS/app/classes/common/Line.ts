import Point = require("classes/common/Point");

export = Line;

// Immutable type
class Line {
    private m_slope: number;
    private m_offsetY: number;

    constructor(slope: number, offsetY: number) {
        this.m_slope = slope;
        this.m_offsetY = offsetY;
    }
    public static fromSegment(point1: Point, point2: Point) : Line {
        var slope = (point2.Y - point1.Y) / (point2.X - point1.X);
        var offsetY = point2.Y - slope * point2.X;

        return new Line(slope, offsetY);
    }
    public getOffsetY(): number {
        return this.m_offsetY;
    }
    public getSlope(): number {
        return this.m_slope;
    }
    public getPoints(point: Point, length: number): Point[] {
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
        }
        else {
            y = point.Y + length;
            x = point.X;
            points.push(new Point(x, y));

            y = point.Y - length;
            x = point.X;
            points.push(new Point(x, y));
        }
        return points;
    }
    public getPerpendicularLine(point: Point): Line {
        var slope = Infinity;
        var offsetY = undefined;

        if (this.getSlope() != 0) {
            slope = -1 / this.getSlope();
            offsetY = -1 * slope * point.X + point.Y;
        }

        return new Line(slope, offsetY);
    }
    public getIntersectionPoint(otherLine: Line): Point {
        var x: number;
        var y: number;
        if (this.getSlope() == Infinity) {
            x = this.getOffsetY();
            y = otherLine.getSlope() * x + otherLine.getOffsetY();
        }
        else if (otherLine.getSlope() == Infinity) {
            x = otherLine.getOffsetY();
            y = this.getSlope() * x + this.getOffsetY();
        }
        else {
            x = (otherLine.getOffsetY() - this.getOffsetY()) / (this.getSlope() - otherLine.getSlope());
            y = this.getSlope() * x + this.getOffsetY();
        }
        return new Point(x, y);
    }
}