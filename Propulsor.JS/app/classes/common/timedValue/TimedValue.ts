import ITween = require("classes/common/transition/tween/ITween");
import BasicTweens = require("classes/common/transition/tween/BasicTweens");
import BasicTweenControllers = require("classes/common/transition/tween/BasicTweenControllers");
import Transition = require("classes/common/transition/Transition");
import TreeMap = require("classes/common/collections/TreeMap");
import TreeMapEntry = require("classes/common/collections/TreeMapEntry");
import IInterpolator = require("classes/common/transition/interpolation/IInterpolator");
import Number = require("classes/common/timedValue/Number");
import BasicComparators = require("classes/common/BasicComparators");
import ITimedValueConfig = require("classes/common/timedValue/ITimedValueConfig");

export = TimedValue;

class TimedValue<T> {
    private _transitions: TreeMap<number, Transition<T>>;
    private _interpolator: IInterpolator<T>;
    private _tween: ITween;

    constructor(defaultValue: T, interpolator: IInterpolator<T>, tween?: ITween) {
        this._transitions = new TreeMap<number, Transition<T>>(BasicComparators.Numbers);
        this._interpolator = interpolator;
        this._tween = tween;
        this.set(defaultValue);
    }

    public reset() {
        this._transitions.clear();
    }

    public set(value: T, config?: ITimedValueConfig) {
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
        this._transitions.put(time, new Transition<T>(time, value, this._interpolator));
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
