import TimedValue = require("classes/common/timedValue/TimedValue");
import Point = require("classes/common/Point");
import Transition = require("classes/common/transition/Transition");
import BasicInterpolators = require("classes/common/transition/interpolation/BasicInterpolators");

export = PointTimedValue;

class PointTimedValue extends TimedValue<Point> {
    constructor(defaultValue: Point) {
        super(defaultValue, BasicInterpolators.Point);

    }
} 