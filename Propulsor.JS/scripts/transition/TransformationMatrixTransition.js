var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "transition/Transition", "common/TransformationMatrixHelper"], function(require, exports, __Transition__, __TransformationMatrixHelper__) {
    var Transition = __Transition__;

    
    var TransformationMatrixHelper = __TransformationMatrixHelper__;

    var TransformationMatrixTransition = (function (_super) {
        __extends(TransformationMatrixTransition, _super);
        function TransformationMatrixTransition() {
                _super.call(this);
        }
        TransformationMatrixTransition.prototype.getValue = function (t) {
            if(t < this.StartTimestamp || t > this.EndTimestamp) {
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
        };
        return TransformationMatrixTransition;
    })(Transition.Transition);
    exports.TransformationMatrixTransition = TransformationMatrixTransition;    
})
