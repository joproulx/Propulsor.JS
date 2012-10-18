var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports", "scripts/transition/Transition"], function(require, exports, __Transition__) {
    var Transition = __Transition__;

    var ColorLinearTransition = (function (_super) {
        __extends(ColorLinearTransition, _super);
        function ColorLinearTransition() {
                _super.call(this);
        }
        ColorLinearTransition.prototype.getValue = function (t) {
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
        ColorLinearTransition.prototype.getColorFromRatio = function (ratio, startValue, endValue) {
            return (ratio * (endValue - startValue)) + startValue;
        };
        return ColorLinearTransition;
    })(Transition.Transition);
    exports.ColorLinearTransition = ColorLinearTransition;    
})

