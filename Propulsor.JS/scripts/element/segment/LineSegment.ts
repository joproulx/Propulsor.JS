import LineSegmentRenderer = module("scripts/element/renderer/LineSegmentRenderer");
import Segment = module("scripts/element/segment/Segment");
import Line = module("scripts/common/Line");
import Joint = module("scripts/element/joint/Joint");
import Point = module("scripts/common/Point");
import SceneNodePointAdapter = module("scripts/scene/SceneNodePointAdapter");

export class LineSegment extends Segment.Segment{
    Line: Line.Line;
    
    constructor () {
        super();
    }
    createSegmentRenderer() {
        return new LineSegmentRenderer.LineSegmentRenderer(this);
    }
    getSlope(t: number) {
        return this.Line.getSlope(t);
    }
    pointFromRatio(t: number, ratio: number) {
        var point1 = this.Joint1.getPosition(t);
        var point2 = this.Joint2.getPosition(t);
        return new Point.Point((ratio * point2.X + (1 - ratio) * point1.X),
                               (ratio * point2.Y + (1 - ratio) * point1.Y));
    }
    setJoints(joint1: Joint.Joint, joint2: Joint.Joint) { 
        super.setJoints(joint1, joint2);
        this.Line = new Line.Line(new SceneNodePointAdapter.SceneNodePointAdapter(joint1.SceneNode),
                                  new SceneNodePointAdapter.SceneNodePointAdapter(joint2.SceneNode));
    }
    tangentAngleFromRatio(t: number, ratio: number) {
        var point1 = this.Joint1.getPosition(t);
        var point2 = this.Joint2.getPosition(t);
        return Math.atan2(point2.Y - point1.Y, point2.X - point1.X);
    }
    pointFromLength(t: number, length: number) {
        return this.pointFromRatio(t, length / this.length(t));
    }
    length(t: number) {
        var point1 = this.Joint1.getPosition(t);
        var point2 = this.Joint2.getPosition(t);

        return Math.sqrt(Math.pow(point2.Y - point1.Y, 2) +
            Math.pow(point2.X - point1.X, 2));
    }
    getPerpendicularLine(t: number, point: Point.Point) {
        return this.Line.getPerpendicularLine(t, point);
    }
    getIntersectionPoint(t: number, otherLine: Line.Line) {
        return this.Line.getIntersectionPoint(t, otherLine);
    }
}