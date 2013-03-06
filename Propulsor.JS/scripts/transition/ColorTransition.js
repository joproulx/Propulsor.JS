var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "transition/Transition"], function(require, exports, __Transition__) {
    var Transition = __Transition__;

    var ColorTransition = (function (_super) {
        __extends(ColorTransition, _super);
        function ColorTransition() {
                _super.call(this);
        }
        ColorTransition.prototype.getValue = function (t) {
            if(t < this.StartTimestamp || t > this.EndTimestamp) {
                throw "Invalid timestamp";
            }
            var ratio = (t - this.StartTimestamp) / (this.EndTimestamp - this.StartTimestamp);
            var r = this.getColorFromRatio(ratio, this.StartValue.R, this.EndValue.R);
            var g = this.getColorFromRatio(ratio, this.StartValue.G, this.EndValue.G);
            var b = this.getColorFromRatio(ratio, this.StartValue.B, this.EndValue.B);
            return {
                R: r,
                G: g,
                B: b
            };
        };
        ColorTransition.prototype.getColorFromRatio = function (ratio, startValue, endValue) {
            return (ratio * (endValue - startValue)) + startValue;
        };
        return ColorTransition;
    })(Transition.Transition);
    exports.ColorTransition = ColorTransition;    
})
