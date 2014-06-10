define(["require", "exports", "classes/common/transition/Transition", "classes/common/timedValue/TreeMap", "classes/common/timedValue/BasicComparators"], function(require, exports, Transition, TreeMap, BasicComparators) {
    

    var TimedValue = (function () {
        function TimedValue(defaultValue, interpolator, tween) {
            this._transitions = new TreeMap(BasicComparators.Numbers);
            this._interpolator = interpolator;
            this._tween = tween;
            this.set(0, defaultValue);
        }
        TimedValue.prototype.reset = function () {
            this._transitions.clear();
        };

        TimedValue.prototype.set = function (t, value, tween) {
            tween = tween === undefined ? this._tween : tween;

            this._transitions.put(t, new Transition(t, value, this._interpolator, tween));
        };

        TimedValue.prototype.get = function (t) {
            var lowerEntry = this._transitions.getLowerEntry(t);

            if (lowerEntry == null) {
                return null;
            }

            var currentTransition = lowerEntry.getValue();

            var upperEntry = this._transitions.getUpperEntry(t);
            var endTime = upperEntry != null ? upperEntry.getValue().getStartTime() : Infinity;
            var endValue = upperEntry != null ? upperEntry.getValue().getStartValue() : currentTransition.getStartValue();

            return currentTransition.getValueAt(t, endTime, endValue);
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
