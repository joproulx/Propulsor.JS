export import Transition = module("transition/Transition");
export import Tween = module("transition/Tween");
export import EaseInTween = module("transition/EaseInTween");
export import SceneNode = module("sceneGraph/SceneNode");
export import Path = module("element/path/Path");
export import Point = module("common/Point");
export import TransformationMatrixHelper = module("common/TransformationMatrixHelper");

export class FollowPathTransition extends Transition.Transition {
    SceneNode: SceneNode.SceneNode;
    Path: Path.Path;
    StartRatio: number;
    EndRatio: number;
    
    constructor (path: Path.Path, startRatio: number, endRatio: number, sceneNode: SceneNode.SceneNode, tween?: Tween.Tween) {
        this.SceneNode = sceneNode;
        this.Path = path;
        this.StartRatio = startRatio;
        this.EndRatio = endRatio;
        super();
    }
    getValue(t: number) {
        if (t < this.StartTimestamp || t > this.EndTimestamp) {
            throw "FollowPathTransition.getValue: Invalid t";
        }



        var ratio = this.Tween.getRatio(t, this.StartTimestamp, this.EndTimestamp);

        var isZeroRatio = (ratio === 0);
        ratio = ((this.EndRatio - this.StartRatio) * ratio + this.StartRatio) % 1;

        if (ratio === 0 && !isZeroRatio) {
            ratio = 1;
        }

        var point = this.Path.getPointFromRatio(t, ratio);
        var matrix = TransformationMatrixHelper.getTransformationFromPoint(this.SceneNode.getParentTransformationMatrix(t), point.X, point.Y);
        return new Point.Point(TransformationMatrixHelper.getTranslationX(matrix), 
                               TransformationMatrixHelper.getTranslationY(matrix));
    }
}