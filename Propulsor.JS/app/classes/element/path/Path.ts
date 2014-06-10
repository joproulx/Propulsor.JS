import Segment = require("classes/element/segment/Segment");
import LineSegment = require("classes/element/segment/LineSegment");
import Joint = require("classes/element/joint/Joint");
import Movable = require("classes/element/Movable");
import PointTimedValue = require("classes/common/timedValue/PointTimedValue");
import SceneNode = require("classes/sceneGraph/SceneNode");
import ISceneNode = require("classes/sceneGraph/ISceneNode");
import Point = require("classes/common/Point");

export = Path;
class Path extends Movable {
    public Segments: Segment[];
    public Joints: Joint[];
    public IsClosedPath: boolean;

    constructor (sceneNode: ISceneNode, segments: Segment[], joints: Joint[], isClosedPath: boolean) {
        this.Segments = segments;
        this.Joints = joints;
        this.IsClosedPath = isClosedPath;
        super(sceneNode);
    }

    private getLastJoint(): Joint{
        return _.last(this.Joints);
    }

    private addJoint(t: number, point: Point): Joint {
        var sceneNode = new SceneNode(this.SceneNode);
        sceneNode.translate(t, point.X, point.Y);
        var joint = new Joint(sceneNode);
        this.Joints.push(joint);
        return joint;
    }

    private addSegment(segment: Segment, jointStart: Joint, jointEnd: Joint): Segment {
        segment.setJoints(jointStart, jointEnd);
        jointStart.setSegment2(segment);
        jointEnd.setSegment1(segment);
        this.Segments.push(segment);
        return segment;
    }

    public static startAt(t: number, point: Point): Path {
        var path = new Path(new SceneNode(), [], [], false);
        path.addJoint(t, point);
        return path;
    }

    public static generateFrom(sceneNode: SceneNode, startTime: number, endTime: number, pointCount: number): Path {
        var increment = (endTime - startTime) / pointCount;

        var path : Path = null;
        for (var t = startTime; t <= endTime; t += increment) {
            var point = sceneNode.getPosition(t);

            if (path === null) {
                path = Path.startAt(0, point);
                continue;
            }

            path.addSegmentTo(0, point);
        }

        return path;
    }

    public addSegmentTo(t: number, point: Point): Path {
        var path = this;

        if (path.Joints.length === 0) {
            path = Path.startAt(t, new Point(0, 0));
        }

        var jointStart = path.getLastJoint();
        var jointEnd = path.addJoint(t, point);
        path.addSegment(new LineSegment(), jointStart, jointEnd);
        return path;
    }

    public close(): Path {
        this.IsClosedPath = true;
        return this;
    }

    length(t: number): number {
        var length = 0;
        for (var i = 0; i < this.Segments.length; i++) {
            length += this.Segments[i].length(t);
        }
        return length;
    }

    getPointFromRatio(t: number, ratio: number) : Point{
        var segment = this.getSegmentFromRatio(t, ratio);
        if (segment != null) {
            return segment.Segment.pointFromRatio(t, segment.Ratio);
        }
        return null;
    }

    getTangentAngleFromRatio(t: number, ratio: number) {
        var segment = this.getSegmentFromRatio(t, ratio);
        if (segment != null) {
            return segment.Segment.tangentAngleFromRatio(t, segment.Ratio);
        }
        return null;
    }

    private getSegmentFromRatio(t: number, ratio: number){
        if (ratio < 0 || ratio > 1) {
            throw "Invalid parameter: ratio. Must be between 0 and 1.";
        }

        var length = this.length(t);
        var currentLength = 0;

        for (var i = 0; i < this.Segments.length; i++) {
            var previousLength = currentLength;

            currentLength += this.Segments[i].length(t);

            var ratio1 = previousLength / length;
            var ratio2 = currentLength / length;

            if (ratio >= ratio1 && ratio <= ratio2) {
                return {
                    Ratio: (ratio - ratio1) / (ratio2 - ratio1),
                    Segment: this.Segments[i]
                }
            }
        }
        return null;
    }
}