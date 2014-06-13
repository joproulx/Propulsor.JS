import IMovable = require("classes/element/IMovable");
import IPath = require("classes/element/path/IPath");
import ITween = require("classes/common/transition/tween/ITween");
import TransformationMatrix = require("classes/common/TransformationMatrix");
import Point = require("classes/common/Point");
import ITimedValueConfig = require("classes/common/timedValue/ITimedValueConfig");

export = ISceneNode;

interface ISceneNode extends IMovable {
    ParentNode: ISceneNode;
    ChildNodes: ISceneNode[];
    addChildSceneNode(sceneNode: ISceneNode);
    getParentTransformationMatrix(t: number): TransformationMatrix;
    getPosition(t: number): Point;
    setAbsolutePosition(point: Point, config?: ITimedValueConfig);
    setRelativePosition(point: Point, config?: ITimedValueConfig);
    //followPathPosition(t: number, path, startRatio: number, endRatio: number);
    //followPathOrientation(t: number, path: IPath, startRatio: number, endRatio: number);
    //followPath(t: number, path: IPath, startRatio: number, endRatio: number);
    translate(dx: number, dy: number, config?: ITimedValueConfig);
    transform(matrix: any, config?: ITimedValueConfig);

}
