var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "classes/common/timedValue/TimedValue", "classes/common/transition/interpolation/BasicInterpolators"], function(require, exports, TimedValue, BasicInterpolators) {
    

    var PointTimedValue = (function (_super) {
        __extends(PointTimedValue, _super);
        function PointTimedValue(defaultValue) {
            _super.call(this, defaultValue, BasicInterpolators.Point);
        }
        return PointTimedValue;
    })(TimedValue);
    return PointTimedValue;
});
//# sourceMappingURL=PointTimedValue.js.map
