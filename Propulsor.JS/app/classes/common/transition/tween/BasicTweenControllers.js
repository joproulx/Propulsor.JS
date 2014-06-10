define(["require", "exports"], function(require, exports) {
    var DefaultController = (function () {
        function DefaultController() {
        }
        DefaultController.prototype.getYRatio = function (xRatio, tween) {
            return tween.getYRatio(xRatio);
        };
        return DefaultController;
    })();
    
    var BasicTweenControllers = (function () {
        function BasicTweenControllers() {
        }
        BasicTweenControllers.Default = new DefaultController();
        return BasicTweenControllers;
    })();
    return BasicTweenControllers;
});
//# sourceMappingURL=BasicTweenControllers.js.map
