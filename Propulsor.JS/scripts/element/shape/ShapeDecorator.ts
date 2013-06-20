import Shape = module("element/shape/Shape");
import Movable = module("element/Movable");
import Point = module("common/Point");
import Path = module("element/path/Path");
import ShapeRenderer = module("element/renderer/ShapeRenderer");
import DrawingStyle = module("element/renderer/drawingContext/DrawingStyle");

export class ShapeDecorator extends Movable.MovableWrapper  implements Shape.IShape {
    private _shape: Shape.IShape;

    constructor(shape: Shape.IShape) {
        this._shape = shape;
        super(shape);
    }

    render(t: number, context: any) { 
        this._shape.render(t, context);
    }

    get Id(): string { return this._shape.Id; }
    set Id(value: string) { this._shape.Id = value }

    get Path(): Path.IPath { return this._shape.Path; }
    set Path(value: Path.IPath) { this._shape.Path = value }

    get Renderer(): ShapeRenderer.ShapeRenderer { return this._shape.Renderer; }
    set Renderer(value: ShapeRenderer.ShapeRenderer) { this._shape.Renderer = value }

    get Stroke(): DrawingStyle.StrokeConfiguration { return this._shape.Stroke; }
    set Stroke(value: DrawingStyle.StrokeConfiguration) { this._shape.Stroke = value }

    get Fill(): DrawingStyle.FillConfiguration { return this._shape.Fill; }
    set Fill(value: DrawingStyle.FillConfiguration) { this._shape.Fill = value }
}