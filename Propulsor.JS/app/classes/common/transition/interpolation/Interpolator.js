define(["require", "exports"], function(require, exports) {
    

    var Interpolator = (function () {
        function Interpolator(delegate) {
            this._delegate = delegate;
        }
        Interpolator.prototype.getValue = function (t, start, end, ratio) {
            return this._delegate(t, start, end, ratio);
        };
        return Interpolator;
    })();
    return Interpolator;
});
//# sourceMappingURL=Interpolator.js.map
