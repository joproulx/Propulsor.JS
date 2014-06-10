var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "classes/common/timedValue/Range"], function(require, exports, Range) {
    

    var TimeRange = (function (_super) {
        __extends(TimeRange, _super);
        function TimeRange(lowerBound, upperBound) {
            _super.call(this, lowerBound, upperBound);
        }
        return TimeRange;
    })(Range);
    return TimeRange;
});
//# sourceMappingURL=TimeRange.js.map
