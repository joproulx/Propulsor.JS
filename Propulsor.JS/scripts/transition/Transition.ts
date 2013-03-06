
export import ITransition = module("transition/ITransition");
export import Tween = module("transition/Tween");

export class Transition implements ITransition.ITransition {
    StartTimestamp;
    EndTimestamp;
    StartValue;
    EndValue;
    Tween: Tween.Tween;

    constructor (tween?: Tween.Tween) { 
        this.StartTimestamp = null;;
        this.EndTimestamp = null;;
        this.StartValue = null;;
        this.EndValue = null;;
        this.Tween = tween ? tween : new Tween.EaseInTween();
    }

    getValue(t: number) { 
        return null;
    }
}