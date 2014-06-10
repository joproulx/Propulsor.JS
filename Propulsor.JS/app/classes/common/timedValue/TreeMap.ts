import IComparator = require("classes/common/timedValue/IComparator");
import TreeMapEntry = require("classes/common/timedValue/TreeMapEntry");

export = TreeMap;


class TreeMap<T, U> {
    private _tree: RBTree<TreeMapEntry<T, U>>;
    private _comparator: IComparator<T>;

    constructor(comparator: IComparator<T>) {
        this._comparator = comparator;
        var _this = this;
        this._tree = new RBTree<TreeMapEntry<T, U>>(function (value1: TreeMapEntry<T, U>, value2: TreeMapEntry<T, U>) {
            return _this._comparator.compare(value1.getKey(), value2.getKey());
        });
    }

    public getMinEntry(): TreeMapEntry<T, U>{
        return this._tree.min();
    }

    public put(key: T, value: U) {
        // Overwrite if already exist
        if (this.containsKey(key)) {
            this.remove(key);
        }

        this.putEntry(new TreeMapEntry(key, value));
    }

    private putEntry(entry: TreeMapEntry<T, U>): boolean {
        return this._tree.insert(entry);
    }

    public remove(key: T) : boolean {
        return this._tree.remove(new TreeMapEntry(key, null));
    }

    public clear() {
        this._tree.clear();
    }

    public getSize(): number {
        return this._tree.size;
    }

    public isEmpty(): boolean{
        return this.getSize() == 0;
    }

    public containsKey(key: T): boolean {
        return this._tree.find(new TreeMapEntry(key, null)) != null;
    }

    public each(callback: (value: TreeMapEntry<T, U>) => void) {
        this._tree.each(callback);
    }

    public getLowerEntry(key: T): TreeMapEntry<T, U> {
        if (this.isEmpty()) {
            return null;
        }

        var iterator = this._tree.lowerBound(new TreeMapEntry(key, null));

        if (iterator === null) {
            return null;
        }

        return iterator.data();
    }

    public getUpperEntry(key: T): TreeMapEntry<T, U> {
        if (this.isEmpty()) {
            return null;
        }

        var iterator = this._tree.upperBound(new TreeMapEntry(key, null));

        if (iterator === null) {
            return null;
        }

        return iterator.data();
    }

    public getFloorEntry(key: T): TreeMapEntry<T, U> {
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
    }

    public removeRange(keyFrom: T, keyTo: T) {
        var itr = this._tree.lowerBound(new TreeMapEntry(keyFrom, null));
        var toRemove: T[];
        var item: T;
        while ((item = itr.next()) !== null) {
            if (this._comparator.compare(item, keyTo) <= 0) {
                toRemove.push(item);
            }
        }
        toRemove.forEach(function (value: T, index: number, array: T[]) {
            this.remove(value);
        });
    }

    public upperEntry(key: T): TreeMapEntry<T, U> {
        if (this.isEmpty()) {
            return null;
        }

        return this._tree.upperBound(new TreeMapEntry(key, null));
    }
}