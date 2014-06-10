import ITween = require("classes/common/transition/tween/ITween");
import Transition = require("classes/common/transition/Transition");
import TreeMap = require("classes/common/timedValue/TreeMap");
import TreeMapEntry = require("classes/common/timedValue/TreeMapEntry");
import IInterpolator = require("classes/common/transition/interpolation/IInterpolator");
import Number = require("classes/common/timedValue/Number");
import BasicComparators = require("classes/common/timedValue/BasicComparators");

export = TimedValue;

class TimedValue<T> {
    private _transitions: TreeMap<number, Transition<T>>;
    private _interpolator: IInterpolator<T>;
    private _tween: ITween;

    constructor(defaultValue: T, interpolator: IInterpolator<T>, tween?: ITween) {
        this._transitions = new TreeMap<number, Transition<T>>(BasicComparators.Numbers);
        this._interpolator = interpolator;
        this._tween = tween;
        this.set(0, defaultValue);
    }

    public reset() {
        this._transitions.clear();
    }

    public set(t: number, value: T, tween?: ITween) {
        tween = tween === undefined ? this._tween : tween;

        this._transitions.put(t, new Transition<T>(t, value, this._interpolator, tween));
    }

    public get(t: number): T {
        var lowerEntry = this._transitions.getLowerEntry(t);

        if (lowerEntry == null) {
            return null;
        }

        var currentTransition = lowerEntry.getValue();

        var upperEntry = this._transitions.getUpperEntry(t);
        var endTime = upperEntry != null ? upperEntry.getValue().getStartTime() : Infinity;
        var endValue = upperEntry != null ? upperEntry.getValue().getStartValue() : currentTransition.getStartValue();

        return currentTransition.getValueAt(t, endTime, endValue);
    }

    public toString(): string {
        var result = '';
        this._transitions.each(function (data: TreeMapEntry<number, Transition<T>>) {
            result += 't:' + data.getKey() + ', StartValue:' + data.getValue().getStartValue() + '\r\n';
        });
        
        return result;
    }
}