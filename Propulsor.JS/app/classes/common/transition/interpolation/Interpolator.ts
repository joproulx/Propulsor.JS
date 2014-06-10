import IInterpolator = require('classes/common/transition/interpolation/IInterpolator');

export = Interpolator;

class Interpolator<T> implements IInterpolator<T> {
    private _delegate: (t: number, start: T, end: T, ratio: number) => T;

    constructor(delegate: (t: number, start: T, end: T, ratio: number) => T) {
        this._delegate = delegate;
    }

    public getValue(t: number, start: T, end: T, ratio: number): T {
        return this._delegate(t, start, end, ratio);
    }
}