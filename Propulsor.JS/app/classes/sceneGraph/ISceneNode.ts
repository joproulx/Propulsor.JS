import IMovable = require("classes/element/IMovable");
import IPath = require("classes/element/path/IPath");
import TransformationMatrix = require("classes/common/TransformationMatrix");
import Point = require("classes/common/Point");

export = ISceneNode;

interface ISceneNode extends IMovable {
    ParentNode: ISceneNode;
    ChildNodes: ISceneNode[];
    addChildSceneNode(sceneNode: ISceneNode);
    getParentTransformationMatrix(t: number): TransformationMatrix;
    getPosition(t: number): Point;
    setAbsolutePosition(t: number, point: Point);
    setRelativePosition(t: number, point: Point);
    //followPathPosition(t: number, path, startRatio: number, endRatio: number);
    //followPathOrientation(t: number, path: IPath, startRatio: number, endRatio: number);
    //followPath(t: number, path: IPath, startRatio: number, endRatio: number);
    translate(t: number, dx: number, dy: number);
    transform(t: number, matrix: any);

}
