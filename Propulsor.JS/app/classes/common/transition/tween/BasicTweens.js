define(["require", "exports", 'classes/common/transition/tween/Tween'], function(require, exports, Tween) {
    
    var BasicTweens = (function () {
        function BasicTweens() {
        }
        BasicTweens.Linear = new Tween(function (xRatio) {
            return xRatio;
        });

        BasicTweens.Default = BasicTweens.Linear;

        BasicTweens.EaseInQuad = new Tween(function (xRatio) {
            return xRatio * xRatio;
        });

        BasicTweens.EaseOutCubic = new Tween(function (xRatio) {
            return ((xRatio - 1) * xRatio * xRatio + 1);
        });
        return BasicTweens;
    })();
    return BasicTweens;
});
//# sourceMappingURL=BasicTweens.js.map
