import Transition = module("transition/Transition");

export class NumberTransition extends Transition.Transition {
    constructor () {
        super();
    }

    getValue(t: number) {
        if (t < this.StartTimestamp || t > this.EndTimestamp) {
            throw "Invalid timestamp";
        }

        var ratio = this.Tween.getRatio(t, this.StartTimestamp, this.EndTimestamp);

        return (ratio * (this.EndValue - this.StartValue)) + this.StartValue;
    }
}