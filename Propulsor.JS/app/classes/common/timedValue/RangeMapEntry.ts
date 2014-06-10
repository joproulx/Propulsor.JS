import IComparable = require("classes/common/timedValue/IComparable");
import Cut = require("classes/common/timedValue/Cut");
import Range = require("classes/common/timedValue/Range");

export = RangeMapEntry;

class RangeMapEntry<T, U>{
    private _range: Range<T>;
    private _value: U;
    
    constructor(range: Range<T>, value: U) {
        this._range = range;
        this._value = value;
    }

    public getLowerBound(): Cut<T> {
        return this._range.LowerBound;
    }

    public getUpperBound(): Cut<T> {
        return this._range.UpperBound;
    }

    public contains(key: T) {
        return this._range.contains(key);
    }

    public getValue(): U {
        return this._value;
    }
}