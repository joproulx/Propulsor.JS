define(["require", "exports", 'classes/common/transition/tween/Tween'], function(require, exports, Tween) {
    
    var BasicTweens = (function () {
        function BasicTweens() {
        }
        BasicTweens.Linear = new Tween(function (xRatio) {
            return xRatio;
        });

        BasicTweens.Default = BasicTweens.Linear;

        BasicTweens.EaseIn = new Tween(function (xRatio) {
            var ratio = BasicTweens.Default.getYRatio(xRatio);
            return -(xRatio) * (xRatio - 2);
        });
        return BasicTweens;
    })();
    return BasicTweens;
});
//# sourceMappingURL=BasicTweens.js.map
