import IMovable = require("classes/element/IMovable");
import Point = require("classes/common/Point");
import Path = require("classes/element/path/Path");
import ITween = require("classes/common/transition/tween/ITween");
import ITimedValueConfig = require("classes/common/timedValue/ITimedValueConfig");

export = MovableWrapper;
class MovableWrapper implements IMovable { 
    private _movable: IMovable;
    
    constructor (movable: IMovable) {
        this._movable = movable;
    }
    public getPosition(t: number)  : Point{
        return this._movable.getPosition(t);
    }
    public setAbsolutePosition(point: Point, config?: ITimedValueConfig) {
        return this._movable.setAbsolutePosition(point, config);
    }
    public setRelativePosition(point: Point, config?: ITimedValueConfig) {
        return this._movable.setRelativePosition(point, config);
    }
    public rotate(radian: number, config?: ITimedValueConfig) {
        this._movable.rotate(radian, config);
    }
    //public followPathPosition(t: number, path: Path, startRatio: number, endRatio: number) {
    //    this._movable.followPathPosition(t, path, startRatio, endRatio);
    //}
}
