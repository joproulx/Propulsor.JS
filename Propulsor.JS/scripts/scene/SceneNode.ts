export import TimedValue = module("common/timedValue/TimedValue");
export import TransformationMatrixHelper = module("common/TransformationMatrixHelper");
export import LinearTimedValue = module("common/timedValue/LinearTimedValue");
export import Point = module("common/Point");
export import PointTransition = module("transition/PointTransition");
export import FollowPathTransition = module("transition/FollowPathTransition");
export import FollowDirectionTransition = module("transition/FollowDirectionTransition");
export import Path = module("element/path/Path");
export import sylvester = module("libs/sylvester/sylvesterLib");
var $M: any = sylvester;

//export interface ITimedGetter {
//    at(t: number): any;
//}

//export interface ITimedSetter {
//    at(t: number): ITimedSetter;
//}


export interface IMovable {
    getPosition(t:number): Point.Point;
    setAbsolutePosition(t:number, point: Point.Point);
    setRelativePosition(t:number, point: Point.Point);
    rotate(t:number, radian: number);
    followPathPosition(t: number, path: Path.Path, startRatio: number, endRatio: number);
}

//export class TimedValueSetter { 
//    at(t: number): ITimedSetter { 
        
        
//    }
//}


export class SceneNode implements IMovable{
    _relativePosition: TimedValue.TimedValue = undefined;
    _relativeOrientation: TimedValue.TimedValue = undefined;
    ParentNode: SceneNode;
    ChildNodes: SceneNode[];

    constructor (parentNode?: SceneNode) {
        this.ParentNode = parentNode === null ? null : parentNode === undefined ? null : parentNode;
        this.ChildNodes = [];

        this._relativePosition = new TimedValue.TimedValue(function () { return new PointTransition.PointTransition(); });
        this._relativePosition.set(0, new Point.Point(0, 0));
        this._relativeOrientation = new LinearTimedValue.LinearTimedValue(0);
    };
    addChildSceneNode(sceneNode: SceneNode) {
        this.ChildNodes.push(sceneNode);
        sceneNode.ParentNode = this;
        sceneNode._relativePosition = new TimedValue.TimedValue(function () { return new PointTransition.PointTransition(); });
        sceneNode._relativePosition.set(0, new Point.Point(0, 0));
        sceneNode._relativeOrientation = new LinearTimedValue.LinearTimedValue(0);
    }
    public getParentTransformationMatrix(t: number) {
        if (this.ParentNode === undefined || this.ParentNode === null) {
            return $M([
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ]);
        }
        return this.ParentNode.getTransformationMatrix(t);
    }
    private getTransformationMatrix(t: number) {
        var relativePosition = this._relativePosition.get(t);
        var relativeOrientation = this._relativeOrientation.get(t);
        var transformationMatrix = TransformationMatrixHelper.getTransformationMatrix(relativeOrientation,
            relativePosition.X,
            relativePosition.Y);

        return this.getParentTransformationMatrix(t).x(transformationMatrix);
    }
    public getPosition(t: number) : Point.Point {
        var matrix = this.getTransformationMatrix(t);
        return new Point.Point(TransformationMatrixHelper.getTranslationX(matrix),
                         TransformationMatrixHelper.getTranslationY(matrix));
    }
    public setAbsolutePosition(t: number, point: Point.Point) {
        // Convert absolute point to relative point
        var translationMatrix = TransformationMatrixHelper.getTransformationFromPoint(this.getParentTransformationMatrix(t), point.X, point.Y);
        this._relativePosition.set(t, new Point.Point(TransformationMatrixHelper.getTranslationX(translationMatrix),
                                           TransformationMatrixHelper.getTranslationY(translationMatrix)));
    }
    public setRelativePosition(t: number, point: Point.Point) {
        this._relativePosition.set(t, point);
    }
    followPathPosition(t: number, path: Path.Path, startRatio: number, endRatio: number) {
        this._relativePosition.set(t, undefined, new FollowPathTransition.FollowPathTransition(path, startRatio, endRatio, this));
    }
    followPathOrientation(t, path, startRatio, endRatio) {
        this._relativeOrientation.set(t, undefined, new FollowDirectionTransition.FollowDirectionTransition(path, startRatio, endRatio, this));
    }
    followPath(t: number, path: Path.Path, startRatio: number, endRatio: number) {
        this.followPathPosition(t, path, startRatio, endRatio);
        this.followPathOrientation(t, path, startRatio, endRatio);
    }
    public rotate(t: number, radian: number) {
        this._relativeOrientation.set(t, radian);
    }
    translate(t: number, dx: number, dy: number) {
        this._relativePosition.set(t, new Point.Point(dx, dy));
    }
}