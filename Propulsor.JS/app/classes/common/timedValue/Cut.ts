import IComparable = require("classes/common/timedValue/IComparable");
import IComparator = require("classes/common/timedValue/IComparator");
import BasicComparators = require("classes/common/timedValue/BasicComparators");
import AbstractMethodError = require("classes/common/error/AbstractMethodError");
import CutComparator = require("classes/common/timedValue/CutComparator");
import BoundType = require("classes/common/timedValue/BoundType");

export = Cut; 

// Based on: https://code.google.com/p/guava-libraries/source/browse/guava/src/com/google/common/collect/Cut.java
class Cut<T> implements IComparable{
    private _endpoint: T;
    private _type: BoundType;
    private _endpointComparator: IComparator<T>;

    constructor(value: T, valueComparator: IComparator<T>) {
        this._endpoint = value;
        this._endpointComparator = valueComparator;
    }

    public isLessThan(value: T): boolean{
        throw new AbstractMethodError();
    }

    public static belowAll<T>(): Cut<T> {
        return new BelowAll<T>();
    }

    public static aboveAll<T>(): Cut<T> {
        return new AboveAll<T>();
    }

    public static belowValue<T>(endpoint: T, comparator: IComparator<T>): Cut<T> {
        return new BelowValue(endpoint, comparator);
    }

    public static aboveValue<T>(endpoint: T, comparator: IComparator<T>): Cut<T> {
        return new AboveValue(endpoint, comparator);
    }


    public getEndpointComparator(): IComparator<T>{
        return this._endpointComparator;
    }

    public getEndpoint(): T {
        return this._endpoint;
    }

    public getValue(): T {
        return this._endpoint;
    }

    public static getComparator<T>(valueComparator: IComparator<T>): IComparator<Cut<T>> {
        return new CutComparator<T>();
    }

    public compareTo(that: Cut<T>): number {
        if (that instanceof BelowAll) {
            return 1;
        }

        if (that instanceof AboveAll) {
            return -1;
        }

        var result = this._endpointComparator.compare(this._endpoint, that._endpoint);
        if (result != 0) {
            return result;
        }

        // same value. below comes before above
        return BasicComparators.Booleans.compare(this instanceof AboveValue, that instanceof AboveValue);
    }
}

class BelowAll<T> extends Cut<T> {
    constructor() {
        super(null, null);
    }

    isLessThan(value: T): boolean {
        return true;
    }

    public compareTo(o: Cut<T>): number {
        return (o == this) ? 0 : -1;
    }
}

class AboveAll<T> extends Cut<T> {
    constructor() {
        super(null, null);
    }
   
    isLessThan(value: T): boolean {
        return false;
    }
   
    public compareTo(o: Cut<T>): number {
    return (o == this) ? 0 : 1;
    }
}

class AboveValue<T> extends Cut<T> {
    constructor(endPoint: T, comparator: IComparator<T>) {
        super(endPoint, comparator);
    }

    public typeAsLowerBound(): BoundType {
        return BoundType.Opened;
    }

    typeAsUpperBound(): BoundType {
        return BoundType.Closed;
    }

    public isLessThan(value: T): boolean {
        return this.getEndpointComparator().compare(this.getEndpoint(), value) < 0;
    }
}

class BelowValue<T> extends Cut<T> {
    constructor(endPoint: T, comparator: IComparator<T>) {
        super(endPoint, comparator);
    }

    public typeAsLowerBound(): BoundType {
        return BoundType.Closed;
    }

    typeAsUpperBound(): BoundType {
        return BoundType.Opened;
    }
    
    public isLessThan(value: T) : boolean {
        return this.getEndpointComparator().compare(this.getEndpoint(), value) <= 0;
    }
}

  
