import IComparator = require("classes/common/timedValue/IComparator");
import Cut = require("classes/common/timedValue/Cut");


export = Range;

// Based on https://code.google.com/p/guava-libraries/source/browse/guava/src/com/google/common/collect/Range.java
class Range<T>{
    public LowerBound: Cut<T>;
    public UpperBound: Cut<T>;
    private _comparator: IComparator<T>;

    constructor(lowerBound: Cut<T>, upperBound: Cut<T>) {
        this.LowerBound = lowerBound;
        this.UpperBound = upperBound;
    }

    public isEmpty(): boolean {
        return this.LowerBound.compareTo(this.UpperBound) == 0;
    }

    public contains(value: T) {
        return this.LowerBound.isLessThan(value) && !this.UpperBound.isLessThan(value);
    }

    public static closed<T>(lower: T, upper: T, comparator: IComparator<T>): Range<T> {
        return Range.create(Cut.belowValue(lower, comparator), Cut.aboveValue(upper, comparator));
    }

    public static opened<T>(lower: T, upper: T, comparator: IComparator<T>): Range<T> {
        return Range.create(Cut.aboveValue(lower, comparator), Cut.belowValue(upper, comparator));
    }

    public static closedOpened<T>(lower: T, upper: T, comparator: IComparator<T>): Range<T> {
        return Range.create(Cut.belowValue(lower, comparator), Cut.belowValue(upper, comparator));
    }

    public static openClosed<T>(lower: T, upper: T, comparator: IComparator<T>): Range<T> {
        return Range.create(Cut.aboveValue(lower, comparator), Cut.aboveValue(upper, comparator));
    }

    public static greaterThan<T>(endpoint: T, comparator: IComparator<T>): Range<T> {
        return Range.create(Cut.aboveValue(endpoint, comparator), Cut.aboveAll<T>());
    }

    public static atLeast<T>(endpoint: T, comparator: IComparator<T>): Range<T> {
        return Range.create(Cut.belowValue(endpoint, comparator), Cut.aboveAll<T>());
    }

    public static create<T>(lowerBound: Cut<T>, upperBound: Cut<T>): Range<T>{
        return new Range<T>(lowerBound, upperBound);
    }
}