export import Shape = module("element/shape/Shape");
export import Movable = module("element/Movable");
export import Point = module("common/Point");

export class ShapeDecorator extends Movable.MovableWrapper implements Shape.IShape {
    private _shape: Shape.IShape;

    constructor(shape: Shape.IShape) {
        this._shape = shape;
        super(shape);
    }
    render(t: number, context: any) { 
        this._shape.render(t, context);
    }
}