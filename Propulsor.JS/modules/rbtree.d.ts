

interface RBTree<T> {
    insert(item: T): boolean;
    remove(item: T): boolean;
    size: number;
    clear();
    find(item: T): T;
    findIter(item: any): any;
    lowerBound(item: T): any;
    upperBound(item: T): any;
    min(): T;
    max(): T;
    each(callback: (any) => void);
}

interface RBTreeFactory {
    new<T> (comparator: (value1: any, value2: any) => number): RBTree<T>;
    
}

declare var RBTree: RBTreeFactory;