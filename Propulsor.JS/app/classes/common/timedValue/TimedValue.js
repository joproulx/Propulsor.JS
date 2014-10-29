define(["require", "exports", "classes/common/transition/tween/BasicTweens", "classes/common/transition/tween/BasicTweenControllers", "classes/common/transition/Transition", "classes/common/collections/TreeMap", "classes/common/BasicComparators"], function(require, exports, BasicTweens, BasicTweenControllers, Transition, TreeMap, BasicComparators) {
    

    var TimedValue = (function () {
        function TimedValue(defaultValue, interpolator, tween) {
            this._cachedValue = null;
            this._transitions = new TreeMap(BasicComparators.Numbers);
            this._interpolator = interpolator;
            this._tween = tween;
            this.set(defaultValue);
        }
        TimedValue.prototype.reset = function () {
            this._transitions.clear();
        };

        TimedValue.prototype.set = function (value, config) {
            var time = (config === undefined || config.For === undefined) ? 0 : config.For;
            var tween = (config === undefined || config.Tween === undefined) ? BasicTweens.Default : config.Tween;
            var tweenController = (config === undefined || config.TweenController === undefined) ? BasicTweenControllers.Default : config.TweenController;

            var lowerEntry = this._transitions.getLowerEntry(time);
            if (lowerEntry != null) {
                time += lowerEntry.getValue().getStartTime();
                lowerEntry.getValue().setTween(tween);
                lowerEntry.getValue().setTweenController(tweenController);
            }

            // TODO: Tween and Tween controller should be applied to previous entry
            this._transitions.put(time, new Transition(time, value, this._interpolator));
        };

        TimedValue.prototype.get = function (t) {
            if (this._cachedValue != null && this._cachedValue.Time == t) {
                return this._cachedValue.Value;
            }

            this._cachedValue = null;
            var lowerEntry = this._transitions.getLowerEntry(t);

            if (lowerEntry == null) {
                return null;
            }

            var currentTransition = lowerEntry.getValue();

            var upperEntry = this._transitions.getUpperEntry(t);
            var endTime = upperEntry != null ? upperEntry.getValue().getStartTime() : Infinity;
            var endValue = upperEntry != null ? upperEntry.getValue().getStartValue() : currentTransition.getStartValue();

            var value = currentTransition.getValueAt(t, endTime, endValue);
            this._cachedValue = { Time: t, Value: value };
            return value;
        };

        TimedValue.prototype.toString = function () {
            var result = '';
            this._transitions.each(function (data) {
                result += 't:' + data.getKey() + ', StartValue:' + data.getValue().getStartValue() + '\r\n';
            });

            return result;
        };
        return TimedValue;
    })();
    return TimedValue;
});
//# sourceMappingURL=TimedValue.js.map
