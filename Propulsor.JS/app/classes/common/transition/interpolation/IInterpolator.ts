export = IInterpolator; 

interface IInterpolator<T> {
    getValue(t: number, startValue: T, endValue: T, ratio: number): T;
}