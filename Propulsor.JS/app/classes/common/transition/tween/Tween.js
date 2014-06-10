define(["require", "exports"], function(require, exports) {
    
    var Tween = (function () {
        function Tween(delegate) {
            this._delegate = delegate;
        }
        Tween.prototype.getYRatio = function (xRatio) {
            return this._delegate(xRatio);
        };
        return Tween;
    })();
    return Tween;
});
//# sourceMappingURL=Tween.js.map
