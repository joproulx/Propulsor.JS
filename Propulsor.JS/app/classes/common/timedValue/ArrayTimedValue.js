var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "classes/common/timedValue/TimedValue", "classes/common/transition/interpolation/ArrayInterpolator"], function(require, exports, TimedValue, ArrayInterpolator) {
    

    var ArrayTimedValue = (function (_super) {
        __extends(ArrayTimedValue, _super);
        function ArrayTimedValue(defaultValue, arrayItemInterpolator) {
            _super.call(this, defaultValue, new ArrayInterpolator(arrayItemInterpolator));
        }
        return ArrayTimedValue;
    })(TimedValue);
    return ArrayTimedValue;
});
//# sourceMappingURL=ArrayTimedValue.js.map
