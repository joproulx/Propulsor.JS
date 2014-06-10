import ITween = require("classes/common/transition/tween/ITween");
import ITweenController = require("classes/common/transition/tween/ITweenController");

export = ChainableTweenController; 

class ChainableTweenController implements ITweenController{
    private _linkedController: ITweenController;

    constructor(linkedTween?: ITweenController) {
        this._linkedController = linkedTween;
    }

    public getYRatio(xRatio: number, tween: ITween): number {
        if (this._linkedController === undefined) {
            return tween.getYRatio(xRatio);
        }
        return this._linkedController.getYRatio(xRatio, tween);
    }
}