var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "classes/common/timedValue/TimedValue", "classes/common/transition/BasicInterpolators"], function(require, exports, TimedValue, BasicInterpolators) {
    

    var NumericTimedValue = (function (_super) {
        __extends(NumericTimedValue, _super);
        function NumericTimedValue(defaultValue) {
            _super.call(this, defaultValue, BasicInterpolators.Numeric);
        }
        return NumericTimedValue;
    })(TimedValue);
    return NumericTimedValue;
});
//# sourceMappingURL=LinearTimedValue.js.map
