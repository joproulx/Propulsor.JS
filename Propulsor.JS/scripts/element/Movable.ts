export import SceneNode = module("scene/SceneNode");
export import Point = module("common/Point");
export import Path = module("element/path/Path");

export class Movable implements SceneNode.IMovable {
    SceneNode: SceneNode.SceneNode;
    
    constructor (sceneNode: SceneNode.SceneNode) {
        this.SceneNode = sceneNode;
    }
    public getPosition(t: number)  : Point.Point{
        return this.SceneNode.getPosition(t);
    }
    public setAbsolutePosition(t: number, point: Point.Point) {
        return this.SceneNode.setAbsolutePosition(t, point);
    }
    public setRelativePosition(t: number, point: Point.Point) {
        return this.SceneNode.setRelativePosition(t, point);
    }
    public rotate(t: number, radian: number) {
        this.SceneNode.rotate(t, radian);
    }
    followPathPosition(t: number, path: Path.Path, startRatio: number, endRatio: number) {
        this.SceneNode.followPathPosition(t, path, startRatio, endRatio);
    }
}


export class MovableWrapper implements SceneNode.IMovable { 
    private _movable: SceneNode.IMovable;
    
    constructor (movable: SceneNode.IMovable) {
        this._movable = movable;
    }
    public getPosition(t: number)  : Point.Point{
        return this._movable.getPosition(t);
    }
    public setAbsolutePosition(t: number, point: Point.Point) {
        return this._movable.setAbsolutePosition(t, point);
    }
    public setRelativePosition(t: number, point: Point.Point) {
        return this._movable.setRelativePosition(t, point);
    }
    public rotate(t: number, radian: number) {
        this._movable.rotate(t, radian);
    }
    followPathPosition(t: number, path: Path.Path, startRatio: number, endRatio: number) {
        this._movable.followPathPosition(t, path, startRatio, endRatio);
    }
}
