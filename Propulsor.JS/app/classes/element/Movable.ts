import ISceneNode = require("classes/sceneGraph/ISceneNode");
import Point = require("classes/common/Point");
import IPath = require("classes/element/path/IPath");
import IMovable = require("classes/element/IMovable");

export = Movable;
class Movable implements IMovable {
    public SceneNode: ISceneNode;
    
    constructor (sceneNode: ISceneNode) {
        this.SceneNode = sceneNode;
    }
    public getPosition(t: number)  : Point{
        return this.SceneNode.getPosition(t);
    }
    public setAbsolutePosition(t: number, point: Point) {
        return this.SceneNode.setAbsolutePosition(t, point);
    }
    public setRelativePosition(t: number, point: Point) {
        return this.SceneNode.setRelativePosition(t, point);
    }
    public rotate(t: number, radian: number) {
        this.SceneNode.rotate(t, radian);
    }
    //followPathPosition(t: number, path: IPath, startRatio: number, endRatio: number) {
    //    this.SceneNode.followPathPosition(t, path, startRatio, endRatio);
    //}
}

