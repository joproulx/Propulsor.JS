export import Transition = module("transition/Transition");
export import CachedTimedValue = module("common/timedValue/CachedTimedValue");
export import underscore = module("libs/underscore/underscoreLib");
var _:any = underscore;


export class TimedValue {
    private _defaultTransitionFactory: () => Transition.Transition;
    Values: any[];
    Cached: CachedTimedValue.CachedTimedValue;
    
    constructor (defaultTransitionFactory?: () => Transition.Transition) {
        this.Values = [];
        this.Cached = new CachedTimedValue.CachedTimedValue();
        this._defaultTransitionFactory = defaultTransitionFactory;
    }
    reset(){ 
        this.Values = [];
        this.Cached = new CachedTimedValue.CachedTimedValue();
    }
    get(t) {
        var value = this.Cached.get(t);
        if (value !== undefined) {
            return value;
        }

        var previous = null;
        var actualValue = null;
        var nextTimestamp = -1;
        var currentTimestamp = 0;

        _.find(this.Values, function (value, index) {
            if (index == t) {
                actualValue = value.Value;
                return true;
            }
            if (index > t) {
                nextTimestamp = index;
                return true;
            }

            currentTimestamp = index;
            previous = value;

            return false;
        }, this);

        if (actualValue != null) {
            this.Cached.set(currentTimestamp, currentTimestamp, actualValue, null);
            return actualValue;
        }

        if (previous != null) {
            this.Cached.set(currentTimestamp, nextTimestamp, previous.Value, previous.Transition);

            if (previous.Transition != null) {
                if (t > previous.Transition.EndTimestamp) {
                    t = previous.Transition.EndTimestamp;
                }

                return previous.Transition.getValue(t);
            }
            return previous.Value;
        }

        return null;
    }
    set(t, value, transition?) {
        this.Cached.invalidate();

        if (t === undefined) {
            t = 0;
        }

        if (transition === undefined && 
            this._defaultTransitionFactory !== undefined &&
            this._defaultTransitionFactory !== null) {
            transition = this._defaultTransitionFactory();
        }

        var currentTransition = null;

        if (transition != undefined &&
            transition != null) {
            var previousValue = null;
            var previousTimestamp = null;
            _.find(this.Values, function (value, index) {
                if (index == t) {
                    currentTransition = value.Transition;
                    return true;
                }
                if (index > t) {
                    currentTransition = previousValue.Transition;
                    return true;
                }
                previousValue = value;
                previousTimestamp = index;
                return false;
            });

            if (previousValue != null) {
                previousValue.Transition = transition;
                transition.StartTimestamp = previousTimestamp;
                transition.EndTimestamp = t;
                transition.StartValue = previousValue.Value;

                if (value === undefined) {
                    value = transition.getValue(t);
                }
                transition.EndValue = value;
            }
        }

        if (currentTransition != null) {
            currentTransition.StartTimestamp = t;
            if (value === undefined) {
                value = transition.getValue(t);
            }

            currentTransition.StartValue = value;
        }

        this.Values[t] = { Value: value, Transition: currentTransition }
    }
}