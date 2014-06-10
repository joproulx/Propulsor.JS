import IComparable = require("classes/common/timedValue/IComparable");
export = Number;

class Number implements IComparable{
    private _value: number;

    constructor(value: number) {
        this._value = value;
    }

    public toNumber(): number {
        return this._value;
    }

    public compareTo(value: any): number {
        return this._value === value ? 0 : this._value < value ? -1 : 1;
    }
} 