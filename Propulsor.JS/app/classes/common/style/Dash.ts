import NumericTimedValue = require("classes/common/timedValue/NumericTimedValue");
import ArrayTimedValue = require("classes/common/timedValue/ArrayTimedValue");
import BasicInterpolators = require("classes/common/transition/interpolation/BasicInterpolators");

export = Dash;
class Dash {
    public Offset: NumericTimedValue;
    public Pattern: ArrayTimedValue<number>;

    constructor () {
        this.Offset = new NumericTimedValue(0);
        this.Pattern = new ArrayTimedValue<number>([], BasicInterpolators.Numeric);
        // TODO: Create a transition for the dash pattern array
    }
}
