import Transition = module("scripts/transition/Transition");
import Point = module("scripts/common/Point");

export class PointLinearTransition extends Transition.Transition {
    constructor () {
        super();
    }
    getValue(t: number) {
        if (t < this.StartTimestamp || t > this.EndTimestamp) {
            throw "Invalid t";
        }

        var ratio = (t - this.StartTimestamp) / (this.EndTimestamp - this.StartTimestamp);
        return new Point.Point(((ratio * (this.EndValue.X - this.StartValue.X)) + this.StartValue.X),
            ((ratio * (this.EndValue.Y - this.StartValue.Y)) + this.StartValue.Y));
    }
}