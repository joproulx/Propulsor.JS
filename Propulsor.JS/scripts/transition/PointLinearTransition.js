var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports", "transition/Transition", "common/Point"], function(require, exports, __Transition__, __Point__) {
    var Transition = __Transition__;

    var Point = __Point__;

    var PointLinearTransition = (function (_super) {
        __extends(PointLinearTransition, _super);
        function PointLinearTransition() {
                _super.call(this);
        }
        PointLinearTransition.prototype.getValue = function (t) {
            if(t < this.StartTimestamp || t > this.EndTimestamp) {
                throw "Invalid t";
            }
            var ratio = (t - this.StartTimestamp) / (this.EndTimestamp - this.StartTimestamp);
            return new Point.Point(((ratio * (this.EndValue.X - this.StartValue.X)) + this.StartValue.X), ((ratio * (this.EndValue.Y - this.StartValue.Y)) + this.StartValue.Y));
        };
        return PointLinearTransition;
    })(Transition.Transition);
    exports.PointLinearTransition = PointLinearTransition;    
})

