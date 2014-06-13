import ISceneNode = require("classes/sceneGraph/ISceneNode");
import Point = require("classes/common/Point");
import ITween = require("classes/common/transition/tween/ITween");
import IPath = require("classes/element/path/IPath");
import IMovable = require("classes/element/IMovable");
import ITimedValueConfig = require("classes/common/timedValue/ITimedValueConfig");

export = Movable;
class Movable implements IMovable {
    public SceneNode: ISceneNode;
    
    constructor (sceneNode: ISceneNode) {
        this.SceneNode = sceneNode;
    }
    public getPosition(t: number)  : Point{
        return this.SceneNode.getPosition(t);
    }
    public setAbsolutePosition(point: Point, config?: ITimedValueConfig) {
        return this.SceneNode.setAbsolutePosition(point, config);
    }
    public setRelativePosition(point: Point, config?: ITimedValueConfig) {
        return this.SceneNode.setRelativePosition(point, config);
    }
    public rotate(radian: number, config?: ITimedValueConfig) {
        this.SceneNode.rotate(radian, config);
    }
    //followPathPosition(t: number, path: IPath, startRatio: number, endRatio: number) {
    //    this.SceneNode.followPathPosition(t, path, startRatio, endRatio);
    //}
}

