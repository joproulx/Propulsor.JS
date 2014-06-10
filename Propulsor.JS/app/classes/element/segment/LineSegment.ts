import LineSegmentRenderer = require("classes/element/renderer/LineSegmentRenderer");
import SegmentRenderer = require("classes/element/renderer/SegmentRenderer");
import Segment = require("classes/element/segment/Segment");
import Line = require("classes/common/Line");
import Joint = require("classes/element/joint/Joint");
import Point = require("classes/common/Point");

export = LineSegment;
class LineSegment extends Segment{
    constructor () {
        super();
    }
    public createSegmentRenderer(): SegmentRenderer {
        return new LineSegmentRenderer(this);
    }
    public getJointPosition1(t: number): Point {
        return this.Joint1.getPosition(t);
    }
    public getJointPosition2(t: number): Point {
        return this.Joint2.getPosition(t);
    }
    private getLine(t: number): Line {
        // TODO: Cache the line to avoid calculate slope every time
        return Line.fromSegment(this.getJointPosition1(t),
                                this.getJointPosition2(t));
    }
    public getSlope(t: number): number {
        return this.getLine(t).getSlope();
    }
    public pointFromRatio(t: number, ratio: number): Point {
        var point1 = this.Joint1.getPosition(t);
        var point2 = this.Joint2.getPosition(t);
        return new Point((ratio * point2.X + (1 - ratio) * point1.X),
                               (ratio * point2.Y + (1 - ratio) * point1.Y));
    }
    public tangentAngleFromRatio(t: number, ratio: number): number {
        var point1 = this.Joint1.getPosition(t);
        var point2 = this.Joint2.getPosition(t);
        return Math.atan2(point2.Y - point1.Y, point2.X - point1.X);
    }
    public pointFromLength(t: number, length: number): Point {
        return this.pointFromRatio(t, length / this.length(t));
    }
    public length(t: number): number {
        var point1 = this.Joint1.getPosition(t);
        var point2 = this.Joint2.getPosition(t);

        return Math.sqrt(Math.pow(point2.Y - point1.Y, 2) +
            Math.pow(point2.X - point1.X, 2));
    }
    public getPerpendicularLine(t: number, point: Point): Line {
        return this.getLine(t).getPerpendicularLine(point);
    }
    public getIntersectionPoint(t: number, otherLine: Line): Point {
        return this.getLine(t).getIntersectionPoint(otherLine);
    }
}