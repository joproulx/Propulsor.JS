define(["require", "exports", "classes/common/timedValue/TreeMapEntry"], function(require, exports, TreeMapEntry) {
    

    var TreeMap = (function () {
        function TreeMap(comparator) {
            this._comparator = comparator;
            var _this = this;
            this._tree = new RBTree(function (value1, value2) {
                return _this._comparator.compare(value1.getKey(), value2.getKey());
            });
        }
        TreeMap.prototype.getMinEntry = function () {
            return this._tree.min();
        };

        TreeMap.prototype.put = function (key, value) {
            // Overwrite if already exist
            if (this.containsKey(key)) {
                this.remove(key);
            }

            this.putEntry(new TreeMapEntry(key, value));
        };

        TreeMap.prototype.putEntry = function (entry) {
            return this._tree.insert(entry);
        };

        TreeMap.prototype.remove = function (key) {
            return this._tree.remove(new TreeMapEntry(key, null));
        };

        TreeMap.prototype.clear = function () {
            this._tree.clear();
        };

        TreeMap.prototype.getSize = function () {
            return this._tree.size;
        };

        TreeMap.prototype.isEmpty = function () {
            return this.getSize() == 0;
        };

        TreeMap.prototype.containsKey = function (key) {
            return this._tree.find(new TreeMapEntry(key, null)) != null;
        };

        TreeMap.prototype.each = function (callback) {
            this._tree.each(callback);
        };

        TreeMap.prototype.getLowerEntry = function (key) {
            if (this.isEmpty()) {
                return null;
            }

            var iterator = this._tree.lowerBound(new TreeMapEntry(key, null));

            if (iterator === null) {
                return null;
            }

            return iterator.data();
        };

        TreeMap.prototype.getUpperEntry = function (key) {
            if (this.isEmpty()) {
                return null;
            }

            var iterator = this._tree.upperBound(new TreeMapEntry(key, null));

            if (iterator === null) {
                return null;
            }

            return iterator.data();
        };

        TreeMap.prototype.getFloorEntry = function (key) {
            if (this.isEmpty()) {
                return null;
            }

            var iterator = this._tree.lowerBound(new TreeMapEntry(key, null));

            if (iterator === null) {
                return null;
            }

            var data = iterator.data();

            if (data === null) {
                return null;
            }

            // Take previous item if
            if (this._comparator.compare(data.getKey(), key) == 0) {
                data = iterator.prev();
            }

            return data;
        };

        TreeMap.prototype.removeRange = function (keyFrom, keyTo) {
            var itr = this._tree.lowerBound(new TreeMapEntry(keyFrom, null));
            var toRemove;
            var item;
            while ((item = itr.next()) !== null) {
                if (this._comparator.compare(item, keyTo) <= 0) {
                    toRemove.push(item);
                }
            }
            toRemove.forEach(function (value, index, array) {
                this.remove(value);
            });
        };

        TreeMap.prototype.upperEntry = function (key) {
            if (this.isEmpty()) {
                return null;
            }

            return this._tree.upperBound(new TreeMapEntry(key, null));
        };
        return TreeMap;
    })();
    return TreeMap;
});
//# sourceMappingURL=TreeMap.js.map
