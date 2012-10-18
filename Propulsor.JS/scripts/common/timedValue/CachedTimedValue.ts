import Transition = module("scripts/transition/Transition")

export class CachedTimedValue {
    Start : number;
    End : number;
    Transition : Transition.Transition;
    Value : any;

    constructor () {
        this.invalidate();
    }
    set(start: number, end: number, value: any, transition: Transition.Transition) {
        this.Start = start;
        this.End = end;
        this.Transition = transition;
        this.Value = value;
    }
    get(t: number) {
        if (this.Start === -1 && this.End === -1) {
            return undefined;
        }

        if (t >= this.Start && (t <= this.End || this.End == -1)) {
            if (this.Transition !== null) {
                return this.Transition.getValue(t);
            }
            return this.Value;
        }
        return undefined;
    }
    invalidate() {
        this.Start = -1;
        this.End = -1;
        this.Value = null;
        this.Transition = null;
    }
}