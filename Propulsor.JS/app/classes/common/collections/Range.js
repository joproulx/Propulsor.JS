define(["require", "exports", "classes/common/collections/Cut"], function(require, exports, Cut) {
    

    // Based on https://code.google.com/p/guava-libraries/source/browse/guava/src/com/google/common/collect/Range.java
    var Range = (function () {
        function Range(lowerBound, upperBound) {
            this.LowerBound = lowerBound;
            this.UpperBound = upperBound;
        }
        Range.prototype.isEmpty = function () {
            return this.LowerBound.compareTo(this.UpperBound) == 0;
        };

        Range.prototype.contains = function (value) {
            return this.LowerBound.isLessThan(value) && !this.UpperBound.isLessThan(value);
        };

        Range.closed = function (lower, upper, comparator) {
            return Range.create(Cut.belowValue(lower, comparator), Cut.aboveValue(upper, comparator));
        };

        Range.opened = function (lower, upper, comparator) {
            return Range.create(Cut.aboveValue(lower, comparator), Cut.belowValue(upper, comparator));
        };

        Range.closedOpened = function (lower, upper, comparator) {
            return Range.create(Cut.belowValue(lower, comparator), Cut.belowValue(upper, comparator));
        };

        Range.openClosed = function (lower, upper, comparator) {
            return Range.create(Cut.aboveValue(lower, comparator), Cut.aboveValue(upper, comparator));
        };

        Range.greaterThan = function (endpoint, comparator) {
            return Range.create(Cut.aboveValue(endpoint, comparator), Cut.aboveAll());
        };

        Range.atLeast = function (endpoint, comparator) {
            return Range.create(Cut.belowValue(endpoint, comparator), Cut.aboveAll());
        };

        Range.create = function (lowerBound, upperBound) {
            return new Range(lowerBound, upperBound);
        };
        return Range;
    })();
    return Range;
});
//# sourceMappingURL=Range.js.map
