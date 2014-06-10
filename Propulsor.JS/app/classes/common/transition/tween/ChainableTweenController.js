define(["require", "exports"], function(require, exports) {
    

    var ChainableTweenController = (function () {
        function ChainableTweenController(linkedTween) {
            this._linkedController = linkedTween;
        }
        ChainableTweenController.prototype.getYRatio = function (xRatio, tween) {
            if (this._linkedController === undefined) {
                return tween.getYRatio(xRatio);
            }
            return this._linkedController.getYRatio(xRatio, tween);
        };
        return ChainableTweenController;
    })();
    return ChainableTweenController;
});
//# sourceMappingURL=ChainableTweenController.js.map
