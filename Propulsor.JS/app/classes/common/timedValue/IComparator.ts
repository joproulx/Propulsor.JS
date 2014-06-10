export = IComparator;

interface IComparator<T> {
    compare(value1: T, value2: T) : number;
}