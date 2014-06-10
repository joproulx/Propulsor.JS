var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "classes/common/transition/tween/ChainableTweenController"], function(require, exports, ChainableTweenController) {
    

    var RepeatTweenController = (function (_super) {
        __extends(RepeatTweenController, _super);
        function RepeatTweenController(linkedTween) {
            _super.call(this, linkedTween);
            this._repeatCount = 1;
        }
        RepeatTweenController.prototype.setRepeatCount = function (count) {
            this._repeatCount = count;
        };

        RepeatTweenController.prototype.getYRatio = function (xRatio, tween) {
            var newXRatio = (xRatio % (xRatio / this._repeatCount)) * this._repeatCount;
            return _super.prototype.getYRatio.call(this, newXRatio, tween);
        };
        return RepeatTweenController;
    })(ChainableTweenController);
    return RepeatTweenController;
});
//# sourceMappingURL=RepeatTweenController.js.map
