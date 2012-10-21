var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports", "transition/Transition", "common/Point", "common/TransformationMatrixHelper"], function(require, exports, __Transition__, __Point__, __TransformationMatrixHelper__) {
    var Transition = __Transition__;

    
    
    var Point = __Point__;

    var TransformationMatrixHelper = __TransformationMatrixHelper__;

    var FollowPathTransition = (function (_super) {
        __extends(FollowPathTransition, _super);
        function FollowPathTransition(path, startRatio, endRatio, sceneNode) {
            this.SceneNode = sceneNode;
            this.Path = path;
            this.StartRatio = startRatio;
            this.EndRatio = endRatio;
                _super.call(this);
        }
        FollowPathTransition.prototype.getValue = function (t) {
            if(t < this.StartTimestamp || t > this.EndTimestamp) {
                throw "FollowPathTransition.getValue: Invalid t";
            }
            var ratio = (t - this.StartTimestamp) / (this.EndTimestamp - this.StartTimestamp);
            var isZeroRatio = (ratio === 0);
            ratio = ((this.EndRatio - this.StartRatio) * ratio + this.StartRatio) % 1;
            if(ratio === 0 && !isZeroRatio) {
                ratio = 1;
            }
            var point = this.Path.getPointFromRatio(t, ratio);
            var matrix = TransformationMatrixHelper.getTransformationFromPoint(this.SceneNode.getParentTransformationMatrix(t), point.X, point.Y);
            return new Point.Point(TransformationMatrixHelper.getTranslationX(matrix), TransformationMatrixHelper.getTranslationY(matrix));
        };
        return FollowPathTransition;
    })(Transition.Transition);
    exports.FollowPathTransition = FollowPathTransition;    
})

