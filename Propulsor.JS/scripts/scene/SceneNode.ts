import TimedValue = module("common/timedValue/TimedValue");
import TransformationMatrixHelper = module("common/TransformationMatrixHelper");
import LinearTimedValue = module("common/timedValue/LinearTimedValue");
import Point = module("common/Point");
import PointLinearTransition = module("transition/PointLinearTransition");
import FollowPathTransition = module("transition/FollowPathTransition");
import FollowDirectionTransition = module("transition/FollowDirectionTransition");
import Path = module("element/Path");
import sylvester = module("libs/sylvester/sylvesterLib");
var $M: any = sylvester;


export class SceneNode {
    _relativePosition = undefined;
    _relativeOrientation = undefined;
    ParentNode;
    ChildNodes;

    constructor (parentNode?: SceneNode) {
        this.ParentNode = parentNode === null ? null : parentNode === undefined ? null : parentNode;
        this.ChildNodes = [];

        this._relativePosition = new TimedValue.TimedValue(function () { return new PointLinearTransition.PointLinearTransition(); });
        this._relativePosition.set(0, new Point.Point(0, 0));
        this._relativeOrientation = new LinearTimedValue.LinearTimedValue(0);
    };
    addChildSceneNode(sceneNode: SceneNode) {
        this.ChildNodes.push(sceneNode);
    }
    getParentTransformationMatrix(t: number) {
        if (this.ParentNode === undefined || this.ParentNode === null) {
            return $M([
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ]);
        }
        return this.ParentNode.getTransformationMatrix(t);
    }
    getTransformationMatrix(t: number) {
        var relativePosition = this._relativePosition.get(t);
        var relativeOrientation = this._relativeOrientation.get(t);
        var transformationMatrix = TransformationMatrixHelper.getTransformationMatrix(relativeOrientation,
            relativePosition.X,
            relativePosition.Y);

        return this.getParentTransformationMatrix(t).x(transformationMatrix);
    }
    getPosition(t: number) {
        var matrix = this.getTransformationMatrix(t);
        return new Point.Point(TransformationMatrixHelper.getTranslationX(matrix),
                         TransformationMatrixHelper.getTranslationY(matrix));
    }
    setPosition(t: number, point: Point.Point) {
        // Convert absolute point to relative point
        var translationMatrix = TransformationMatrixHelper.getTransformationFromPoint(this.getParentTransformationMatrix(t), point.X, point.Y);
        this._relativePosition.set(t, new Point.Point(TransformationMatrixHelper.getTranslationX(translationMatrix),
                                           TransformationMatrixHelper.getTranslationY(translationMatrix)));
    }
    followPathPosition(t: number, path: Path.Path, startRatio: number, endRatio: number) {
        this._relativePosition.set(t, undefined, new FollowPathTransition.FollowPathTransition(path, startRatio, endRatio, this));
    }
    followPathOrientation(t, path, startRatio, endRatio) {
        this._relativeOrientation.set(t, undefined, new FollowDirectionTransition.FollowDirectionTransition(path, startRatio, endRatio, this));
    }
    followPath(t: number, path: Path.Path, startRatio: number, endRatio: number) {
        this.followPathPosition(t, path, startRatio, endRatio);
        this.followPathOrientation(t, path, startRatio, endRatio);
    }
    rotate(t: number, radian: number) {
        this._relativeOrientation.set(t, radian);
    }
    translate(t: number, dx: number, dy: number) {
        this._relativePosition.set(t, new Point.Point(dx, dy));
    }
}