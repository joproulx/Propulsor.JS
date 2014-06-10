var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "classes/common/timedValue/BasicComparators", "classes/common/error/AbstractMethodError", "classes/common/timedValue/CutComparator", "classes/common/timedValue/BoundType"], function(require, exports, BasicComparators, AbstractMethodError, CutComparator, BoundType) {
    

    // Based on: https://code.google.com/p/guava-libraries/source/browse/guava/src/com/google/common/collect/Cut.java
    var Cut = (function () {
        function Cut(value, valueComparator) {
            this._endpoint = value;
            this._endpointComparator = valueComparator;
        }
        Cut.prototype.isLessThan = function (value) {
            throw new AbstractMethodError();
        };

        Cut.belowAll = function () {
            return new BelowAll();
        };

        Cut.aboveAll = function () {
            return new AboveAll();
        };

        Cut.belowValue = function (endpoint, comparator) {
            return new BelowValue(endpoint, comparator);
        };

        Cut.aboveValue = function (endpoint, comparator) {
            return new AboveValue(endpoint, comparator);
        };

        Cut.prototype.getEndpointComparator = function () {
            return this._endpointComparator;
        };

        Cut.prototype.getEndpoint = function () {
            return this._endpoint;
        };

        Cut.prototype.getValue = function () {
            return this._endpoint;
        };

        Cut.getComparator = function (valueComparator) {
            return new CutComparator();
        };

        Cut.prototype.compareTo = function (that) {
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
        };
        return Cut;
    })();

    var BelowAll = (function (_super) {
        __extends(BelowAll, _super);
        function BelowAll() {
            _super.call(this, null, null);
        }
        BelowAll.prototype.isLessThan = function (value) {
            return true;
        };

        BelowAll.prototype.compareTo = function (o) {
            return (o == this) ? 0 : -1;
        };
        return BelowAll;
    })(Cut);

    var AboveAll = (function (_super) {
        __extends(AboveAll, _super);
        function AboveAll() {
            _super.call(this, null, null);
        }
        AboveAll.prototype.isLessThan = function (value) {
            return false;
        };

        AboveAll.prototype.compareTo = function (o) {
            return (o == this) ? 0 : 1;
        };
        return AboveAll;
    })(Cut);

    var AboveValue = (function (_super) {
        __extends(AboveValue, _super);
        function AboveValue(endPoint, comparator) {
            _super.call(this, endPoint, comparator);
        }
        AboveValue.prototype.typeAsLowerBound = function () {
            return 1 /* Opened */;
        };

        AboveValue.prototype.typeAsUpperBound = function () {
            return 2 /* Closed */;
        };

        AboveValue.prototype.isLessThan = function (value) {
            return this.getEndpointComparator().compare(this.getEndpoint(), value) < 0;
        };
        return AboveValue;
    })(Cut);

    var BelowValue = (function (_super) {
        __extends(BelowValue, _super);
        function BelowValue(endPoint, comparator) {
            _super.call(this, endPoint, comparator);
        }
        BelowValue.prototype.typeAsLowerBound = function () {
            return 2 /* Closed */;
        };

        BelowValue.prototype.typeAsUpperBound = function () {
            return 1 /* Opened */;
        };

        BelowValue.prototype.isLessThan = function (value) {
            return this.getEndpointComparator().compare(this.getEndpoint(), value) <= 0;
        };
        return BelowValue;
    })(Cut);
    return Cut;
});
//# sourceMappingURL=Cut.js.map
