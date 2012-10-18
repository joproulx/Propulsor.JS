import Transition = module("scripts/transition/Transition");
import SceneNode = module("scripts/scene/SceneNode");
import Path = module("scripts/element/Path");

export class FollowDirectionTransition extends Transition.Transition {
    SceneNode: SceneNode.SceneNode;
    Path: Path.Path;
    StartRatio: number;
    EndRatio: number;
    
    constructor (path: Path.Path, startRatio: number, endRatio: number, sceneNode: SceneNode.SceneNode) {
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

        var ratio = (t - this.StartTimestamp) / (this.EndTimestamp - this.StartTimestamp);
        var isZeroRatio = (ratio === 0);
        ratio = ((this.EndRatio - this.StartRatio) * ratio + this.StartRatio) % 1;

        if (ratio === 0 && !isZeroRatio) {
            ratio = 1;
        }

        var radians = this.Path.getTangentAngleFromRatio(t, ratio);
        return radians;
    }
}