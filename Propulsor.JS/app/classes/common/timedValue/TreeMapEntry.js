define(["require", "exports"], function(require, exports) {
    

    var TreeMapEntry = (function () {
        function TreeMapEntry(key, value) {
            this._key = key;
            this._value = value;
        }
        TreeMapEntry.prototype.getValue = function () {
            return this._value;
        };

        TreeMapEntry.prototype.getKey = function () {
            return this._key;
        };
        return TreeMapEntry;
    })();
    return TreeMapEntry;
});
//# sourceMappingURL=TreeMapEntry.js.map
