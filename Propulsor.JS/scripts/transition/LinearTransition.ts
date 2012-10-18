import Transition = module("scripts/transition/Transition");

export class LinearTransition extends Transition.Transition {
    constructor () {
        super();
    }

    getValue(t: number) {
        if (t < this.StartTimestamp || t > this.EndTimestamp) {
            throw "Invalid timestamp";
        }

        var ratio = (t - this.StartTimestamp) / (this.EndTimestamp - this.StartTimestamp);
        return (ratio * (this.EndValue - this.StartValue)) + this.StartValue;
    }
}