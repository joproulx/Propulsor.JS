import ITween = require("classes/common/transition/tween/ITween");
import ITweenController = require("classes/common/transition/tween/ITweenController");
import ChainableTweenController = require("classes/common/transition/tween/ChainableTweenController");

export = RepeatTweenController;

class RepeatTweenController extends ChainableTweenController {
    private _repeatCount: number;

    constructor(linkedTween?: ITweenController) {
        super(linkedTween);
        this._repeatCount = 1;
    }

    public setRepeatCount(count: number) {
        this._repeatCount = count;
    }

    public getYRatio(xRatio: number, tween: ITween): number {
        var newXRatio = (xRatio % (xRatio / this._repeatCount)) * this._repeatCount;
        return super.getYRatio(newXRatio, tween);
    }
} 