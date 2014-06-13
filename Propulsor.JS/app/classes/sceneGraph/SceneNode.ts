import IPath = require("classes/element/path/IPath");
import TimedValue = require("classes/common/timedValue/TimedValue");
import TransformationMatrix = require("classes/common/TransformationMatrix");
import NumericTimedValue = require("classes/common/timedValue/NumericTimedValue");
import PointTimedValue = require("classes/common/timedValue/PointTimedValue");
import Point = require("classes/common/Point");
import ISceneNode = require("classes/sceneGraph/ISceneNode");
import ITween = require("classes/common/transition/tween/ITween");
import ITimedValueConfig = require("classes/common/timedValue/ITimedValueConfig");
//import FollowPathTransition = require("transition/FollowPathTransition");
//import FollowDirectionTransition = require("transition/FollowDirectionTransition");

export = SceneNode;
class SceneNode implements ISceneNode{
    private _relativePosition: PointTimedValue = undefined;
    private _relativeOrientation: TimedValue<number> = undefined;
    public ParentNode: SceneNode;
    public ChildNodes: SceneNode[];

    constructor (parentNode?: ISceneNode) {
        this.ChildNodes = [];

        this._relativePosition = new PointTimedValue(new Point(0, 0));
        this._relativeOrientation = new NumericTimedValue(0);

        parentNode = parentNode === undefined ? null : <SceneNode>parentNode;
        if (parentNode !== null) { 
            parentNode.addChildSceneNode(this);
        }
    }
    public addChildSceneNode(sceneNode: ISceneNode) {
        var actualNode = <SceneNode>sceneNode;

        this.ChildNodes.push(actualNode);
        actualNode.ParentNode = this;
    }
    public getParentTransformationMatrix(t: number): TransformationMatrix {
        if (this.ParentNode === undefined || this.ParentNode === null) {
            return TransformationMatrix.fromArray([
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ]);
        }
        return this.ParentNode.getTransformationMatrix(t);
    }
    private getTransformationMatrix(t: number): TransformationMatrix {
        var relativePosition = this._relativePosition.get(t);
        var relativeOrientation = this._relativeOrientation.get(t);

        
        var transformationMatrix = TransformationMatrix.fromTransformation(relativePosition.X,
            relativePosition.Y,
            relativeOrientation);

        // TODO: Cache transformation to avoid calculate on each draw

        return this.getParentTransformationMatrix(t).transforms(transformationMatrix);
    }
    public getPosition(t: number) : Point {
        var matrix = this.getTransformationMatrix(t);
        return new Point(matrix.getTranslationX(),
                         matrix.getTranslationY());
    }
    public setAbsolutePosition(point: Point, config?: ITimedValueConfig) {
        var time = (config === undefined || config.For === undefined) ? 0 : config.For;
        // Convert absolute point to relative point
        var translationMatrix = this.getParentTransformationMatrix(time).getRelativeTranslation(point.X, point.Y);
        this._relativePosition.set(new Point(translationMatrix.getTranslationX(),
                                                translationMatrix.getTranslationY()), config);
    }
    public setRelativePosition(point: Point, config?: ITimedValueConfig) {
        this._relativePosition.set(point, config);
    }
    //followPathPosition(t: number, path, startRatio: number, endRatio: number) {
    //    this._relativePosition.set(t, undefined, new FollowPathTransition(path, startRatio, endRatio, this));
    //}
    //followPathOrientation(t: number, path: IPath, startRatio: number, endRatio: number) {
    //    this._relativeOrientation.set(t, undefined, new FollowDirectionTransition(path, startRatio, endRatio, this));
    //}
    //followPath(t: number, path: IPath, startRatio: number, endRatio: number) {
    //    this.followPathPosition(t, path, startRatio, endRatio);
    //    this.followPathOrientation(t, path, startRatio, endRatio);
    //}
    public rotate(radian: number, config?: ITimedValueConfig) {
        this._relativeOrientation.set(radian, config);
    }
    translate(dx: number, dy: number, config?: ITimedValueConfig) {
        this._relativePosition.set(new Point(dx, dy), config);
    }
    transform(matrix: any, config?: ITimedValueConfig) { 
        var tx = matrix.e(1, 3);
        var ty = matrix.e(2, 3);
        var cosTheta = matrix.e(1, 1);
        
        this._relativeOrientation.set(Math.acos(cosTheta), config);
        this._relativePosition.set(new Point(tx, ty), config);
    }


}