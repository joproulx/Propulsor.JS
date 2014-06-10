import TimedValue = require("classes/common/timedValue/TimedValue");
import Transition = require("classes/common/transition/Transition");
import BasicInterpolators = require("classes/common/transition/interpolation/BasicInterpolators");
import ArrayInterpolator = require("classes/common/transition/interpolation/ArrayInterpolator");
import IInterpolator = require('classes/common/transition/interpolation/IInterpolator');

export = ArrayTimedValue;

class ArrayTimedValue<T> extends TimedValue<T[]> {
    constructor(defaultValue: T[], arrayItemInterpolator: IInterpolator<T>) {
        super(defaultValue, new ArrayInterpolator<T>(arrayItemInterpolator));

    }
}

 