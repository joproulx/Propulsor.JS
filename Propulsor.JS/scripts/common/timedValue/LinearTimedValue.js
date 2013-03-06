var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "common/timedValue/TimedValue", "transition/NumberTransition"], function(require, exports, __TimedValue__, __NumberTransition__) {
    var TimedValue = __TimedValue__;

    var NumberTransition = __NumberTransition__;

    var LinearTimedValue = (function (_super) {
        __extends(LinearTimedValue, _super);
        function LinearTimedValue(defaultValue) {
                _super.call(this, function () {
        return new NumberTransition.NumberTransition();
    });
            if(arguments.length === 1) {
                this.set(0, defaultValue);
            }
        }
        return LinearTimedValue;
    })(TimedValue.TimedValue);
    exports.LinearTimedValue = LinearTimedValue;    
})
