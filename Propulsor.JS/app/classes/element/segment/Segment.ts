import NumericTimedValue = require("classes/common/timedValue/NumericTimedValue");
import Joint = require("classes/element/joint/Joint");
import Point = require("classes/common/Point");
import SegmentRenderer = require("classes/element/renderer/SegmentRenderer");

export = Segment;
class Segment {
    public Joint1: Joint;
    public Joint2: Joint;
    public StartRatio: NumericTimedValue;
    public EndRatio: NumericTimedValue;
    
    constructor () {
        this.Joint1 = null;
        this.Joint2 = null;
        this.StartRatio = new NumericTimedValue(0);
        this.EndRatio = new NumericTimedValue(1);
    }
    public setJoints(joint1: Joint, joint2: Joint) {
        this.Joint1 = joint1;
        this.Joint2 = joint2;
    }
    public getDrawnRatios(): number {
        return null;
    }
    public length(t: number): number { 
        return 0;
    }
    public pointFromRatio(t: number, ratio: number): Point {
        return null;
    }
    public tangentAngleFromRatio(t: number, ratio: number): number {
        return 0;
    }
    // TODO: Remove reference to SegmentRenderer. Use IElementRenderer interface?
    public createSegmentRenderer(): SegmentRenderer { 
        return null;
    }
}