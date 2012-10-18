import TimedValue = module("scripts/common/timedValue/TimedValue");
import LinearTransition = module("scripts/transition/LinearTransition");

export class LinearTimedValue extends TimedValue.TimedValue {
    constructor (defaultValue) {
        super(function () => 
              {
                 return new LinearTransition.LinearTransition()
              });

        if (arguments.length === 1) {
            this.set(0, defaultValue);
        }
    }
}