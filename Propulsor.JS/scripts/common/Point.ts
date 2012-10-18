export class Point {
    X: number;
    Y: number;

    constructor (x?: number, y?: number) {
        this.X = x;
        this.Y = y;
    }
    copy(copyValue) {
        this.X = copyValue.X;
        this.Y = copyValue.Y;
    }
    clone() {
        var newPoint = new Point();
        newPoint.copy(this);
        return newPoint;
    }
    distanceFrom(otherPoint: Point) {
        return Math.sqrt(Math.pow(otherPoint.Y - this.Y, 2) + Math.pow(otherPoint.X - this.X, 2));
    }
    minus(otherPoint) {
        return new Point(this.X - otherPoint.X, this.Y - otherPoint.Y);
    }
    equals(other: Point) {
        return other.X == this.X && other.Y == this.Y;
    }
    toString() {
        return this.X + ", " + this.Y;
    }
    multiplyBy(value: number) {
        return new Point(this.X * value, this.Y * value);
    }
    x(value: number) {
        return this.multiplyBy(value);
    }
    add(point: Point) {
        return new Point(this.X + point.X, this.Y + point.Y);
    }
}