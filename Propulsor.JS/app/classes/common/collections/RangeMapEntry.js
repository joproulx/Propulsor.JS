define(["require", "exports"], function(require, exports) {
    

    var RangeMapEntry = (function () {
        function RangeMapEntry(range, value) {
            this._range = range;
            this._value = value;
        }
        RangeMapEntry.prototype.getLowerBound = function () {
            return this._range.LowerBound;
        };

        RangeMapEntry.prototype.getUpperBound = function () {
            return this._range.UpperBound;
        };

        RangeMapEntry.prototype.contains = function (key) {
            return this._range.contains(key);
        };

        RangeMapEntry.prototype.getValue = function () {
            return this._value;
        };
        return RangeMapEntry;
    })();
    return RangeMapEntry;
});
//# sourceMappingURL=RangeMapEntry.js.map
