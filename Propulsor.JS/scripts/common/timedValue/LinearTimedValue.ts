import TimedValue = module("common/timedValue/TimedValue");
import NumberTransition = module("transition/NumberTransition");

export class LinearTimedValue extends TimedValue.TimedValue {
    constructor (defaultValue) {
        super(function () => 
              {
                 return new NumberTransition.NumberTransition()
              });

        if (arguments.length === 1) {
            this.set(0, defaultValue);
        }
    }
}