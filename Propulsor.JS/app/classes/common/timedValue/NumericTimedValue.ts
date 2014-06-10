import TimedValue = require("classes/common/timedValue/TimedValue");
import Transition = require("classes/common/transition/Transition");
import BasicInterpolators = require("classes/common/transition/interpolation/BasicInterpolators");

export = NumericTimedValue;

class NumericTimedValue extends TimedValue<number> {
    constructor(defaultValue: number) {
        super(defaultValue, BasicInterpolators.Numeric);
    }
}

