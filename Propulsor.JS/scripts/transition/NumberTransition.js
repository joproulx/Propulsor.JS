var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "transition/Transition"], function(require, exports, __Transition__) {
    var Transition = __Transition__;

    var NumberTransition = (function (_super) {
        __extends(NumberTransition, _super);
        function NumberTransition() {
                _super.call(this);
        }
        NumberTransition.prototype.getValue = function (t) {
            if(t < this.StartTimestamp || t > this.EndTimestamp) {
                throw "Invalid timestamp";
            }
            var ratio = this.Tween.getRatio(t, this.StartTimestamp, this.EndTimestamp);
            return (ratio * (this.EndValue - this.StartValue)) + this.StartValue;
        };
        return NumberTransition;
    })(Transition.Transition);
    exports.NumberTransition = NumberTransition;    
})
