
export import Shape = module("element/shape/Shape");
export import Point = module("common/Point");
export import SceneNode = module("sceneGraph/SceneNode");
export import Joint = module("element/joint/Joint");
export import EndPoint = module("element/joint/EndPoint");
export import Segment = module("element/segment/Segment");
export import LineSegment = module("element/segment/LineSegment");
export import Path = module("element/path/Path");
export import BezierSegment = module("element/segment/BezierSegment");
export import underscore = module("libs/underscore/underscoreLib");
var _:any = underscore;


export interface IPathBuilder {
    load(t: number, pathDefinition: any): Path.IPath;
}


export class JsonPathBuilder implements IPathBuilder { 
    private _segments: Segment.Segment[];
    private _joints: Joint.Joint[];
    private _isClosedPath: bool;
    private _sceneNode: SceneNode.SceneNode;

    load(t: number, pathDefinition: any): Path.IPath { 
        var isJoint = true;
        this._segments = [];
        this._joints = [];
        this._sceneNode = new SceneNode.SceneNode();
        this._sceneNode.translate(t, pathDefinition.Origin.X, pathDefinition.Origin.X);
        this._isClosedPath = pathDefinition.IsClosedPath;
        var path = new Path.Path(this._sceneNode, this._segments, this._joints, this._isClosedPath);

        var thisObj = this;
        this._isClosedPath = pathDefinition._isClosedPath;
        var index = 0;
        _.each(pathDefinition.Items, function (item) {
            if (isJoint) {
                var isEndPoint = (index === 0 || index === (pathDefinition.Items.length - 1));
                thisObj.extractJoints(t, item, isEndPoint);
            }
            else {
                thisObj.extractSegments(t, item);
            }
            isJoint = !isJoint;
            index++;
        });

        if (this._isClosedPath && this._segments.length < this._joints.length) { 
            this._segments.push(new LineSegment.LineSegment());
        }

        this.linkJointsAndSegments(this._segments);
        return path;
    }

    private extractJoints(t, item, isEndPoint) {
        var sceneNode = new SceneNode.SceneNode(this._sceneNode);
        sceneNode.translate(t, item.X, item.Y);

        if (this._isClosedPath || !isEndPoint) {
            this._joints.push(new Joint.Joint(sceneNode));
        }
        else {
            this._joints.push(new EndPoint.EndPoint(sceneNode));
        }
    }
    private extractSegments(t, item) {
        if (item.SegmentType === "bezier") {
            var segment = new BezierSegment.BezierSegment();
            var sceneNode = new SceneNode.SceneNode(this._sceneNode);
            sceneNode.translate(t, item.ControlPoint1.X, item.ControlPoint1.Y);
            var sceneNode2 = new SceneNode.SceneNode(this._sceneNode);
            sceneNode2.translate(t, item.ControlPoint2.X, item.ControlPoint2.Y);
            segment.setControlPoints(sceneNode, sceneNode2);
            this._segments.push(segment);
        }
        else if (item.SegmentType === "line") {
            this._segments.push(new LineSegment.LineSegment());
        }
    }
    private linkJointsAndSegments(segments) {
        for (var i = 0; i < this._joints.length; i++) {
            if (i == 0) {
                if (!this._isClosedPath) {
                    this._joints[i].setSegments(segments[0], segments[0]);
                }
                else {
                    this._joints[i].setSegments(segments[segments.length - 1], segments[0]);
                }
            }
            else if (i == (this._joints.length - 1)) {
                if (!this._isClosedPath) {
                    this._joints[i].setSegments(segments[i - 1], segments[i - 1]);
                }
                else {
                    this._joints[i].setSegments(segments[i - 1], segments[i]);
                }
            }
            else {
                this._joints[i].setSegments(segments[i - 1], segments[i]);
            }
        }

        var upperBound = this._joints.length;
        if (!this._isClosedPath) {
            upperBound = upperBound - 1;
        }

        for (var j = 0; j < upperBound; j++) {
            if (j == (this._joints.length - 1) && this._isClosedPath) {
                segments[j].setJoints(this._joints[j], this._joints[0]);
            }
            else {
                segments[j].setJoints(this._joints[j], this._joints[j + 1]);
            }
        }
    }
}


export class JsonPathDefinition {
    IsClosedPath: bool;
    Origin: any;
    Items: any[];
}
