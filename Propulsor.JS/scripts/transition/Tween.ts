
export class Tween  {
    constructor () { 
    }

    getRatio(t: number, start: number, end: number) { 
        return (t - start) / (end - start);
        
    }
}


export class EaseInTween extends Tween {
    constructor () { 
        super();
    }

    getRatio(t: number, start: number, end: number) { 
    var ratio = super.getRatio(t, start, end);
    var newT =    t / (end - start);
    return -(newT)*(newT-2);
        
    }
}