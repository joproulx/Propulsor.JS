export = IComparable; 
// Cannot use generic because this is not supported: class Cut<T extends IComparable<T>>{
interface IComparable {
    compareTo(value: any): number;
}