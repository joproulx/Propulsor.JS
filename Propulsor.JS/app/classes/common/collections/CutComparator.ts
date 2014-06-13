import IComparator = require("classes/common/IComparator");
import Cut = require("classes/common/collections/Cut");

export = CutComparator;

class CutComparator<T> implements IComparator<Cut<T>> {
    public compare(value1: Cut<T>, value2: Cut<T>): number {
        return value1.compareTo(value2);
    }
}