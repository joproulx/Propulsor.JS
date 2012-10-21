var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports", "transition/Transition"], function(require, exports, __Transition__) {
    var Transition = __Transition__;

    var LinearTransition = (function (_super) {
        __extends(LinearTransition, _super);
        function LinearTransition() {
                _super.call(this);
        }
        LinearTransition.prototype.getValue = function (t) {
            if(t < this.StartTimestamp || t > this.EndTimestamp) {
                throw "Invalid timestamp";
            }
            var ratio = (t - this.StartTimestamp) / (this.EndTimestamp - this.StartTimestamp);
            return (ratio * (this.EndValue - this.StartValue)) + this.StartValue;
        };
        return LinearTransition;
    })(Transition.Transition);
    exports.LinearTransition = LinearTransition;    
})

