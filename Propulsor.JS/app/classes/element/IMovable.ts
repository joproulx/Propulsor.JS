import SceneNode = require("classes/sceneGraph/SceneNode");
import Point = require("classes/common/Point");
import IPath = require("classes/element/path/IPath");

export = IMovable;

interface IMovable {
    getPosition(t:number): Point;
    setAbsolutePosition(t:number, point: Point);
    setRelativePosition(t:number, point: Point);
    rotate(t:number, radian: number);
    //followPathPosition(t: number, path: IPath, startRatio: number, endRatio: number);
}
