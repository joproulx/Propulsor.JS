import IMovable = require("classes/element/IMovable");
import Point = require("classes/common/Point");
import Path = require("classes/element/path/Path");

export = MovableWrapper;
class MovableWrapper implements IMovable { 
    private _movable: IMovable;
    
    constructor (movable: IMovable) {
        this._movable = movable;
    }
    public getPosition(t: number)  : Point{
        return this._movable.getPosition(t);
    }
    public setAbsolutePosition(t: number, point: Point) {
        return this._movable.setAbsolutePosition(t, point);
    }
    public setRelativePosition(t: number, point: Point) {
        return this._movable.setRelativePosition(t, point);
    }
    public rotate(t: number, radian: number) {
        this._movable.rotate(t, radian);
    }
    //public followPathPosition(t: number, path: Path, startRatio: number, endRatio: number) {
    //    this._movable.followPathPosition(t, path, startRatio, endRatio);
    //}
}
