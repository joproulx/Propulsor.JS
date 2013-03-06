var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "transition/Transition"], function(require, exports, __Transition__) {
    var Transition = __Transition__;

    
    
    
    
    var FollowDirectionTransition = (function (_super) {
        __extends(FollowDirectionTransition, _super);
        function FollowDirectionTransition(path, startRatio, endRatio, sceneNode) {
            this.SceneNode = sceneNode;
            this.Path = path;
            this.StartRatio = startRatio;
            this.EndRatio = endRatio;
                _super.call(this);
        }
        FollowDirectionTransition.prototype.getValue = function (t) {
            if(t < this.StartTimestamp || t > this.EndTimestamp) {
                throw "FollowPathTransition.getValue: Invalid t";
            }
            var ratio = this.Tween.getRatio(t, this.StartTimestamp, this.EndTimestamp);
            var isZeroRatio = (ratio === 0);
            ratio = ((this.EndRatio - this.StartRatio) * ratio + this.StartRatio) % 1;
            if(ratio === 0 && !isZeroRatio) {
                ratio = 1;
            }
            var radians = this.Path.getTangentAngleFromRatio(t, ratio);
            return radians;
        };
        return FollowDirectionTransition;
    })(Transition.Transition);
    exports.FollowDirectionTransition = FollowDirectionTransition;    
})
