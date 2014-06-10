import IShape = require("classes/element/shape/IShape");
import IMovable = require("classes/element/IMovable");
import MovableWrapper = require("classes/element/MovableWrapper");
import Point = require("classes/common/Point");
import StrokeConfiguration = require("classes/common/style/StrokeConfiguration");
import FillConfiguration = require("classes/common/style/FillConfiguration");
import IPath = require("classes/element/path/IPath");
import ShapeRenderer = require("classes/element/renderer/ShapeRenderer");
import SceneNode = require("classes/sceneGraph/SceneNode");

export = ShapeDecorator;
class ShapeDecorator extends MovableWrapper implements IShape {
    private _shape: IShape;

    constructor(shape: IShape) {
        this._shape = shape;
        super(<IMovable>shape);
    }

    public render(t: number, context: any) { 
        this._shape.render(t, context);
    }

    public get Id(): string { return this._shape.Id; }
    public set Id(value: string) { this._shape.Id = value }

    public get Path(): IPath { return this._shape.Path; }
    public set Path(value: IPath) { this._shape.Path = value }

    public get Renderer(): ShapeRenderer { return this._shape.Renderer; }
    public set Renderer(value: ShapeRenderer) { this._shape.Renderer = value }

    public get Stroke(): StrokeConfiguration { return this._shape.Stroke; }
    public set Stroke(value: StrokeConfiguration) { this._shape.Stroke = value }

    public get Fill(): FillConfiguration { return this._shape.Fill; }
    public set Fill(value: FillConfiguration) { this._shape.Fill = value }
}