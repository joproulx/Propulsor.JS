export import Transition = module("transition/Transition");

export class ColorTransition extends Transition.Transition {
    constructor () {
        super();
    }
    getValue(t: number) {
        if (t < this.StartTimestamp || t > this.EndTimestamp) {
            throw "Invalid timestamp";
        }

        var ratio = (t - this.StartTimestamp) / (this.EndTimestamp - this.StartTimestamp);
        var r = this.getColorFromRatio(ratio, this.StartValue.R, this.EndValue.R);
        var g = this.getColorFromRatio(ratio, this.StartValue.G, this.EndValue.G);
        var b = this.getColorFromRatio(ratio, this.StartValue.B, this.EndValue.B);

        return {
            R: r,
            G: g,
            B: b
        }
    }
    getColorFromRatio(ratio: number, startValue: number, endValue: number) {
        return (ratio * (endValue - startValue)) + startValue
    }
}