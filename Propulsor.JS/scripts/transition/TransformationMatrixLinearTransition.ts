import Transition = module("scripts/transition/Transition");
import Point = module("scripts/common/Point");
import TransformationMatrixHelper = module("scripts/common/TransformationMatrixHelper");

export class TransformationMatrixLinearTransition extends Transition.Transition{
    constructor () {
        super();
    }
    getValue(t: number) {
        if (t < this.StartTimestamp || t > this.EndTimestamp) {
            throw "Invalid t";
        }

        var ratio = (t - this.StartTimestamp) / (this.EndTimestamp - this.StartTimestamp);
        var startRadians = TransformationMatrixHelper.getRotationRadian(this.StartValue);
        var endRadians = TransformationMatrixHelper.getRotationRadian(this.EndValue);
        var radians = ratio * (endRadians) + startRadians;
        var startTx = TransformationMatrixHelper.getTranslationX(this.StartValue);
        var startTy = TransformationMatrixHelper.getTranslationY(this.StartValue);
        var endTx = TransformationMatrixHelper.getTranslationX(this.EndValue);
        var endTy = TransformationMatrixHelper.getTranslationY(this.EndValue);
        var tx = ratio * (endTx - startTx) + startTx;
        var ty = ratio * (endTy - startTy) + startTy;
        return TransformationMatrixHelper.getTransformationMatrix(radians, tx, ty);
    }
}