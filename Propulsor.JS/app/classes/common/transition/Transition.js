define(["require", "exports", "classes/common/transition/tween/BasicTweens", "classes/common/transition/tween/BasicTweenControllers"], function(require, exports, BasicTweens, BasicTweenControllers) {
    

    // Immutable type
    var Transition = (function () {
        function Transition(startTime, startValue, interpolator, tween, tweenController) {
            this._startValue = startValue;
            this._startTime = startTime;
            this._interpolator = interpolator;
            this._tween = (tween !== undefined) ? tween : BasicTweens.Default;
            this._tweenController = (tweenController !== undefined) ? tweenController : BasicTweenControllers.Default;
        }
        Transition.prototype.getStartTime = function () {
            return this._startTime;
        };

        Transition.prototype.getStartValue = function () {
            return this._startValue;
        };

        Transition.prototype.getRatio = function (t, startTime, endTime) {
            var xRatio = (t - startTime) / (endTime - startTime);

            return this._tweenController.getYRatio(xRatio, this._tween);
        };

        Transition.prototype.getValueAt = function (t, endTime, endValue) {
            return this._interpolator.getValue(t, this._startValue, endValue, this.getRatio(t, this._startTime, endTime));
        };
        return Transition;
    })();
    return Transition;
});
//# sourceMappingURL=Transition.js.map
