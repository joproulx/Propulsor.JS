define(["require", "exports", "classes/common/timedValue/Cut", "classes/common/timedValue/Range", "classes/common/timedValue/TreeMap", "classes/common/timedValue/RangeMapEntry"], function(require, exports, Cut, Range, TreeMap, RangeMapEntry) {
    

    // Based on: https://code.google.com/p/guava-libraries/source/browse/guava/src/com/google/common/collect/TreeRangeMap.java
    var TreeRangeMap = (function () {
        function TreeRangeMap(endpointComparator) {
            this._endpointComparator = endpointComparator;
            this._entriesByLowerBound = new TreeMap(Cut.getComparator(endpointComparator));
        }
        TreeRangeMap.prototype.clear = function () {
            this._entriesByLowerBound.clear();
        };

        TreeRangeMap.prototype.get = function (key) {
            var entry = this.getEntry(key);
            return (entry == null) ? null : entry.getValue();
        };

        TreeRangeMap.prototype.getEntry = function (key) {
            var mapEntry = this._entriesByLowerBound.getFloorEntry(Cut.belowValue(key, this._endpointComparator));
            if (mapEntry != null && mapEntry.getValue().contains(key)) {
                return mapEntry.getValue();
            } else {
                return null;
            }
        };

        TreeRangeMap.prototype.getEntryAbove = function (key) {
            var mapEntry = this._entriesByLowerBound.getUpperEntry(Cut.belowValue(key, this._endpointComparator));
            if (mapEntry != null) {
                return mapEntry.getValue();
            } else {
                return null;
            }
        };

        TreeRangeMap.prototype.getFirstRange = function () {
            return this._entriesByLowerBound.getMinEntry().getValue();
        };

        TreeRangeMap.prototype.put = function (range, value) {
            this.remove(range);
            this._entriesByLowerBound.put(range.LowerBound, new RangeMapEntry(range, value));
        };

        TreeRangeMap.prototype.putRangeMapEntry = function (lowerBound, upperBound, value) {
            this._entriesByLowerBound.put(lowerBound, new RangeMapEntry(new Range(lowerBound, upperBound), value));
        };

        TreeRangeMap.prototype.remove = function (rangeToRemove) {
            if (rangeToRemove.isEmpty()) {
                return;
            }

            var mapEntryBelowToTruncate;

            mapEntryBelowToTruncate = this._entriesByLowerBound.getLowerEntry(rangeToRemove.LowerBound);

            if (mapEntryBelowToTruncate != null) {
                // we know ( [
                var rangeMapEntry = mapEntryBelowToTruncate.getValue();
                if (rangeMapEntry.getUpperBound().compareTo(rangeToRemove.LowerBound) > 0) {
                    // we know ( [ )
                    if (rangeMapEntry.getUpperBound().compareTo(rangeToRemove.UpperBound) > 0) {
                        // we know ( [ ] ), so insert the range ] ) back into the map --
                        // it's being split apart
                        this.putRangeMapEntry(rangeToRemove.UpperBound, rangeMapEntry.getUpperBound(), mapEntryBelowToTruncate.getValue().getValue());
                    }

                    // overwrite mapEntryToTruncateBelow with a truncated range
                    this.putRangeMapEntry(rangeMapEntry.getLowerBound(), rangeToRemove.LowerBound, mapEntryBelowToTruncate.getValue().getValue());
                }
            }

            var mapEntryAboveToTruncate;

            mapEntryAboveToTruncate = this._entriesByLowerBound.getLowerEntry(rangeToRemove.UpperBound);
            if (mapEntryAboveToTruncate != null) {
                // we know ( ]
                var rangeMapEntry = mapEntryAboveToTruncate.getValue();
                if (rangeMapEntry.getUpperBound().compareTo(rangeToRemove.UpperBound) > 0) {
                    // we know ( ] ), and since we dealt with truncating below already,
                    // we know [ ( ] )
                    this.putRangeMapEntry(rangeToRemove.UpperBound, rangeMapEntry.getUpperBound(), mapEntryAboveToTruncate.getValue().getValue());

                    this._entriesByLowerBound.remove(rangeToRemove.LowerBound);
                }
            }

            this._entriesByLowerBound.removeRange(rangeToRemove.LowerBound, rangeToRemove.UpperBound);
        };
        return TreeRangeMap;
    })();
    return TreeRangeMap;
});
//# sourceMappingURL=TreeRangeMap.js.map
