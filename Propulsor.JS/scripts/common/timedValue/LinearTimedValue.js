var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports", "scripts/common/timedValue/TimedValue", "scripts/transition/LinearTransition"], function(require, exports, __TimedValue__, __LinearTransition__) {
    var TimedValue = __TimedValue__;

    var LinearTransition = __LinearTransition__;

    var LinearTimedValue = (function (_super) {
        __extends(LinearTimedValue, _super);
        function LinearTimedValue(defaultValue) {
                _super.call(this, function () {
        return new LinearTransition.LinearTransition();
    });
            if(arguments.length === 1) {
                this.set(0, defaultValue);
            }
        }
        return LinearTimedValue;
    })(TimedValue.TimedValue);
    exports.LinearTimedValue = LinearTimedValue;    
})

