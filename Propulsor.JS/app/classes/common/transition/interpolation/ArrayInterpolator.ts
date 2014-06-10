import IInterpolator = require('classes/common/transition/interpolation/IInterpolator');

export = ArrayInterpolator;

class ArrayInterpolator<T> implements IInterpolator<T[]> {
    private _arrayItemInterpolator: IInterpolator<T>;
    public constructor(arrayItemInterpolator: IInterpolator<T>) {
        this._arrayItemInterpolator = arrayItemInterpolator;
    }
    public getValue(t: number, start: T[], end: T[], ratio: number): T[] {
        var lenght = start.length > end.length ? start.length : end.length;

        var newArray = [];
        for(var i = 0; i < lenght; i++) {
            if (start.length <= i) {
                newArray[i] = end[i];
                continue;
            }

            if (end.length <= i) {
                newArray[i] = start[i];
                continue;
            }

            newArray[i] = this._arrayItemInterpolator.getValue(t, start[i], end[i], ratio);
        }

        return newArray;
    }
}