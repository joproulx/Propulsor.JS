
export = TreeMapEntry;

class TreeMapEntry<T, U> {
    private _key: T;
    private _value: U;

    constructor(key: T, value: U) {
        this._key = key;
        this._value = value;
    }

    public getValue(): U {
        return this._value;
    }

    public getKey(): T {
        return this._key;
    }
} 