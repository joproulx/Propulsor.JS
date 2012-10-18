import LinearTimedValue = module("scripts/common/timedValue/LinearTimedValue");
import Joint = module("scripts/element/joint/Joint");

export class Segment {
    Joint1: Joint.Joint;
    Joint2: Joint.Joint;
    StartRatio: LinearTimedValue.LinearTimedValue;
    EndRatio: LinearTimedValue.LinearTimedValue;
    
    constructor () {
        this.Joint1 = null;
        this.Joint2 = null;
        this.StartRatio = new LinearTimedValue.LinearTimedValue(0);
        this.EndRatio = new LinearTimedValue.LinearTimedValue(1);
    }
    setJoints(joint1: Joint.Joint, joint2: Joint.Joint) {
        this.Joint1 = joint1;
        this.Joint2 = joint2;
    }
    getDrawnRatios() {
        return null;
    }
    length(t: number) { 
        return 0;
    }
    pointFromRatio(t: number, ratio: number) {
        return null;
    }
    tangentAngleFromRatio(t: number, ratio: number) {
        return 0;
    }
}