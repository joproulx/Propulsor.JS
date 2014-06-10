import IComparator = require("classes/common/timedValue/IComparator");
export = BasicComparators;


class Booleans implements IComparator<boolean> {
    public compare(value1: boolean, value2: boolean): number {
        if (value1 === value2) {
            return 0;
        }

        if (value1 === true && value2 === false) {
            return 1;
        }

        return -1;
    }
}

class Numbers implements IComparator<number> {
    public compare(value1: number, value2: number): number {
        return value1 - value2;
    }
}

class BasicComparators {
    public static Booleans: IComparator<boolean> = new Booleans();
    public static Numbers: IComparator<number> = new Numbers();
}