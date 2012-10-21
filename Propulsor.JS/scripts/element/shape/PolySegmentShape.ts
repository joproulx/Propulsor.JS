import Shape = module("element/shape/Shape");
import SceneNode = module("scene/SceneNode");
import Joint = module("element/joint/Joint");
import EndPoint = module("element/joint/EndPoint");
import Segment = module("element/segment/Segment");
import LineSegment = module("element/segment/LineSegment");
import Path = module("element/Path");
import BezierSegment = module("element/segment/BezierSegment");
import underscore = module("libs/underscore/underscoreLib");
var _:any = underscore;

export class PolySegmentShape extends Shape.Shape{
    Segments: Segment.Segment[];
    Joints: Joint.Joint[];
    SceneNode: SceneNode.SceneNode;
    IsClosedPath: bool;

    constructor (t: number, pathJson: any) {
        this.SceneNode = new SceneNode.SceneNode();
        this.SceneNode.setPosition(t, pathJson.Origin);
        var path = this.loadFromObject(t, pathJson);
        super(path);
    }
    extractJoints(t, item, isEndPoint) {
        var sceneNode = new SceneNode.SceneNode(this.SceneNode);
        sceneNode.translate(t, item.X, item.Y);

        if (this.IsClosedPath || !isEndPoint) {
            this.Joints.push(new Joint.Joint(sceneNode));
        }
        else {
            this.Joints.push(new EndPoint.EndPoint(sceneNode));
        }
    }
    extractSegments(t, item) {
        if (item.SegmentType === "bezier") {
            var segment = new BezierSegment.BezierSegment();
            var sceneNode = new SceneNode.SceneNode(this.SceneNode);
            sceneNode.translate(t, item.ControlPoint1.X, item.ControlPoint1.Y);
            var sceneNode2 = new SceneNode.SceneNode(this.SceneNode);
            sceneNode2.translate(t, item.ControlPoint2.X, item.ControlPoint2.Y);
            segment.setControlPoints(sceneNode, sceneNode2);
            this.Segments.push(segment);
        }
        else if (item.SegmentType === "line") {
            this.Segments.push(new LineSegment.LineSegment());
        }
    }
    loadFromObject(t, object) {
        var isJoint = true;
        this.Segments = [];
        this.Joints = [];

        var thisObj = this;
        this.IsClosedPath = object.IsClosedPath;
        var index = 0;
        _.each(object.Items, function (item) {
            if (isJoint) {
                var isEndPoint = (index === 0 || index === (object.Items.length - 1));
                thisObj.extractJoints(t, item, isEndPoint);
            }
            else {
                thisObj.extractSegments(t, item);
            }
            isJoint = !isJoint;
            index++;
        });

        this.linkJointsAndSegments(this.Segments);
        return new Path.Path(this.Segments, this.IsClosedPath);
    }
    linkJointsAndSegments(segments) {
        for (var i = 0; i < this.Joints.length; i++) {
            if (i == 0) {
                if (!this.IsClosedPath) {
                    this.Joints[i].setSegments(segments[0], segments[0]);
                }
                else {
                    this.Joints[i].setSegments(segments[segments.length - 1], segments[0]);
                }
            }
            else if (i == (this.Joints.length - 1)) {
                if (!this.IsClosedPath) {
                    this.Joints[i].setSegments(segments[i - 1], segments[i - 1]);
                }
                else {
                    this.Joints[i].setSegments(segments[i - 1], segments[i]);
                }
            }
            else {
                this.Joints[i].setSegments(segments[i - 1], segments[i]);
            }
        }

        var upperBound = this.Joints.length;
        if (!this.IsClosedPath) {
            upperBound = upperBound - 1;
        }

        for (var j = 0; j < upperBound; j++) {
            if (j == (this.Joints.length - 1) && this.IsClosedPath) {
                segments[j].setJoints(this.Joints[j], this.Joints[0]);
            }
            else {
                segments[j].setJoints(this.Joints[j], this.Joints[j + 1]);
            }
        }
    }
    
}