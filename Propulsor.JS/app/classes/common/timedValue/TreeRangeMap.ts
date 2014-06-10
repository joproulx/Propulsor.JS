import IComparator = require("classes/common/timedValue/IComparator");
import Cut = require("classes/common/timedValue/Cut");
import Range = require("classes/common/timedValue/Range");
import TreeMap = require("classes/common/timedValue/TreeMap");
import RangeMapEntry = require("classes/common/timedValue/RangeMapEntry");
import TreeMapEntry = require("classes/common/timedValue/TreeMapEntry");

export = TreeRangeMap;

// Based on: https://code.google.com/p/guava-libraries/source/browse/guava/src/com/google/common/collect/TreeRangeMap.java
class TreeRangeMap<T, U> {
    private _entriesByLowerBound: TreeMap<Cut<T>, RangeMapEntry<T, U>>;
    private _endpointComparator: IComparator<T>;

    constructor(endpointComparator: IComparator<T>) {
        this._endpointComparator = endpointComparator;
        this._entriesByLowerBound = new TreeMap<Cut<T>, RangeMapEntry<T, U>>(Cut.getComparator(endpointComparator));
    }

    public clear() {
        this._entriesByLowerBound.clear();
    }

    public get(key: T): U {
        var entry: RangeMapEntry<T, U> = this.getEntry(key);
        return (entry == null) ? null : entry.getValue();
    }

    public getEntry(key: T): RangeMapEntry<T, U> {
        var mapEntry: TreeMapEntry<Cut<T>, RangeMapEntry<T, U>> = this._entriesByLowerBound.getFloorEntry(Cut.belowValue(key, this._endpointComparator));
        if (mapEntry != null && mapEntry.getValue().contains(key)) {
            return mapEntry.getValue();
        } else {
            return null;
        }
    }

    public getEntryAbove(key: T): RangeMapEntry<T, U> {
        var mapEntry: TreeMapEntry<Cut<T>, RangeMapEntry<T, U>> = this._entriesByLowerBound.getUpperEntry(Cut.belowValue(key, this._endpointComparator));
        if (mapEntry != null) {
            return mapEntry.getValue();
        } else {
            return null;
        }
    }

    public getFirstRange(): RangeMapEntry<T, U> {
        return this._entriesByLowerBound.getMinEntry().getValue();
    }

    public put(range: Range<T>, value: U) {
        this.remove(range);
        this._entriesByLowerBound.put(range.LowerBound, new RangeMapEntry(range, value));
    }

    private putRangeMapEntry(lowerBound: Cut<T>, upperBound: Cut<T>, value: U) {
        this._entriesByLowerBound.put(lowerBound, new RangeMapEntry<T, U>(new Range<T>(lowerBound, upperBound), value));
    }

    public remove(rangeToRemove: Range<T>) {
        if (rangeToRemove.isEmpty()) {
            return;
        }

        var mapEntryBelowToTruncate: TreeMapEntry<Cut<T>, RangeMapEntry<T, U>>;

        mapEntryBelowToTruncate = this._entriesByLowerBound.getLowerEntry(rangeToRemove.LowerBound);

        if (mapEntryBelowToTruncate != null) {
            // we know ( [
            var rangeMapEntry: RangeMapEntry<T, U> = mapEntryBelowToTruncate.getValue();
            if (rangeMapEntry.getUpperBound().compareTo(rangeToRemove.LowerBound) > 0) {
                // we know ( [ )
                if (rangeMapEntry.getUpperBound().compareTo(rangeToRemove.UpperBound) > 0) {
                    // we know ( [ ] ), so insert the range ] ) back into the map --
                    // it's being split apart
                    this.putRangeMapEntry(rangeToRemove.UpperBound,
                        rangeMapEntry.getUpperBound(),
                        mapEntryBelowToTruncate.getValue().getValue());
                }
                // overwrite mapEntryToTruncateBelow with a truncated range
                this.putRangeMapEntry(rangeMapEntry.getLowerBound(),
                    rangeToRemove.LowerBound,
                    mapEntryBelowToTruncate.getValue().getValue());
            }
        }

        var mapEntryAboveToTruncate: TreeMapEntry<Cut<T>, RangeMapEntry<T, U>>;

        mapEntryAboveToTruncate = this._entriesByLowerBound.getLowerEntry(rangeToRemove.UpperBound);
        if (mapEntryAboveToTruncate != null) {
            // we know ( ]
            var rangeMapEntry: RangeMapEntry<T, U> = mapEntryAboveToTruncate.getValue();
            if (rangeMapEntry.getUpperBound().compareTo(rangeToRemove.UpperBound) > 0) {
                // we know ( ] ), and since we dealt with truncating below already,
                // we know [ ( ] )
                this.putRangeMapEntry(rangeToRemove.UpperBound,
                    rangeMapEntry.getUpperBound(),
                    mapEntryAboveToTruncate.getValue().getValue());

                this._entriesByLowerBound.remove(rangeToRemove.LowerBound);
            }
        }

        this._entriesByLowerBound.removeRange(rangeToRemove.LowerBound, rangeToRemove.UpperBound);
    }
}