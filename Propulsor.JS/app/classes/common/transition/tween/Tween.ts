import ITween = require('classes/common/transition/tween/ITween');

export = Tween;
class Tween implements ITween{
    private _delegate: (xRatio: number) => number;

    constructor(delegate: (xRatio: number) => number) {
        this._delegate = delegate;
    }

    public getYRatio(xRatio: number): number {
        return this._delegate(xRatio);
    }
}