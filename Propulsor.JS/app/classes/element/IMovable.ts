import ITween = require("classes/common/transition/tween/ITween");
import SceneNode = require("classes/sceneGraph/SceneNode");
import Point = require("classes/common/Point");
import IPath = require("classes/element/path/IPath");
import ITimedValueConfig = require("classes/common/timedValue/ITimedValueConfig");

export = IMovable;

interface IMovable {
    getPosition(t:number): Point;
    setAbsolutePosition(point: Point, config?: ITimedValueConfig);
    setRelativePosition(point: Point, config?: ITimedValueConfig);
    rotate(radian: number, config?: ITimedValueConfig);
    //followPathPosition(t: number, path: IPath, startRatio: number, endRatio: number);
}
