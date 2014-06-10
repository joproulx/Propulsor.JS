import NumericTimedValue = require("classes/common/timedValue/NumericTimedValue");

export = Ratio;
class Ratio {
    public Start: NumericTimedValue;
    public End: NumericTimedValue;

    constructor () {
        this.Start = new NumericTimedValue(0);
        this.End = new NumericTimedValue(1);
    }
}