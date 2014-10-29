define(["require", "exports"], function(require, exports) {
    var DefaultController = (function () {
        function DefaultController() {
        }
        DefaultController.prototype.getYRatio = function (xRatio, tween) {
            return tween.getYRatio(xRatio);
        };
        return DefaultController;
    })();

    var MirrorController = (function () {
        function MirrorController() {
        }
        MirrorController.prototype.getYRatio = function (xRatio, tween) {
            if (xRatio <= 0.5) {
                return tween.getYRatio(xRatio * 2);
            }

            return tween.getYRatio((1 - xRatio) * 2);
        };
        return MirrorController;
    })();
    
    var BasicTweenControllers = (function () {
        function BasicTweenControllers() {
        }
        BasicTweenControllers.Default = new DefaultController();

        BasicTweenControllers.Mirror = new MirrorController();
        return BasicTweenControllers;
    })();
    return BasicTweenControllers;
});
//# sourceMappingURL=BasicTweenControllers.js.map
