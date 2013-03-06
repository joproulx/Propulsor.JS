var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "transition/Transition", "common/Point"], function(require, exports, __Transition__, __Point__) {
    var Transition = __Transition__;

    var Point = __Point__;

    var PointTransition = (function (_super) {
        __extends(PointTransition, _super);
        function PointTransition() {
                _super.call(this);
        }
        PointTransition.prototype.getValue = function (t) {
            if(t < this.StartTimestamp || t > this.EndTimestamp) {
                throw "Invalid t";
            }
            var ratio = this.Tween.getRatio(t, this.StartTimestamp, this.EndTimestamp);
            return new Point.Point(((ratio * (this.EndValue.X - this.StartValue.X)) + this.StartValue.X), ((ratio * (this.EndValue.Y - this.StartValue.Y)) + this.StartValue.Y));
        };
        return PointTransition;
    })(Transition.Transition);
    exports.PointTransition = PointTransition;    
})
