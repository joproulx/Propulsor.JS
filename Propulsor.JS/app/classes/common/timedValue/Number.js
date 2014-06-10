define(["require", "exports"], function(require, exports) {
    

    var Number = (function () {
        function Number(value) {
            this._value = value;
        }
        Number.prototype.toNumber = function () {
            return this._value;
        };

        Number.prototype.compareTo = function (value) {
            return this._value === value ? 0 : this._value < value ? -1 : 1;
        };
        return Number;
    })();
    return Number;
});
//# sourceMappingURL=Number.js.map
