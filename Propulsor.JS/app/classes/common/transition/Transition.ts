import ITween = require("classes/common/transition/tween/ITween");
import ITweenController = require("classes/common/transition/tween/ITweenController");
import IInterpolator = require("classes/common/transition/interpolation/IInterpolator");
import BasicTweens = require("classes/common/transition/tween/BasicTweens");
import BasicTweenControllers = require("classes/common/transition/tween/BasicTweenControllers");
import AbstractMethodError = require("classes/common/error/AbstractMethodError");

export = Transition;

// Immutable type
class Transition<T>{
    private _tween: ITween;
    private _tweenController: ITweenController;
    private _interpolator: IInterpolator<T>;
    private _startValue: T;
    private _startTime: number;

    constructor(startTime: number, startValue: T, interpolator: IInterpolator<T>, tween?: ITween, tweenController?: ITweenController) { 
        this._startValue = startValue;
        this._startTime = startTime;
        this._interpolator = interpolator;
        this._tween = (tween !== undefined) ? tween : BasicTweens.Default;
        this._tweenController = (tweenController !== undefined) ? tweenController : BasicTweenControllers.Default;
    }

    public getStartTime(): number {
        return this._startTime;
    }

    public getStartValue(): T {
        return this._startValue;
    }

    private getRatio(t: number, startTime: number, endTime: number): number {
        var xRatio = (t - startTime) / (endTime - startTime);

        return this._tweenController.getYRatio(xRatio, this._tween);
    }

    public getValueAt(t: number, endTime: number, endValue: T): T { 
        return this._interpolator.getValue(t, this._startValue, endValue, this.getRatio(t, this._startTime, endTime));
    }
}
