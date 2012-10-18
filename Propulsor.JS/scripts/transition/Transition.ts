
import ITransition = module("scripts/transition/ITransition");

export class Transition implements ITransition.ITransition {
    StartTimestamp;
    EndTimestamp;
    StartValue;
    EndValue;

    constructor () { 
        this.StartTimestamp = null;;
        this.EndTimestamp = null;;
        this.StartValue = null;;
        this.EndValue = null;;
    }

    getValue(t: number) { 
        return null;
    }
}