import Shape = module("element/shape/Shape");
import ShapeDecorator = module("element/shape/ShapeDecorator");
import JsonPathBuilder = module("element/path/JsonPathBuilder");
import Path = module("element/path/Path");
import Point = module("common/Point");

export class LineShape extends ShapeDecorator.ShapeDecorator{
    _path: Path.Path;

    constructor (t: number, x1: number, y1: number, x2: number, y2: number) {
        var pathDefinition = new JsonPathBuilder.JsonPathDefinition();
        
        var halfX = (x2 - x1) / 2;
        var halfY = (y2 - y1) / 2;
        
        pathDefinition.IsClosedPath= false;
        pathDefinition.Origin = { X: (x1 + halfX), Y: (y1 + halfY) };
        pathDefinition.Items = [{ X: -halfX, Y: -halfY },
                                { SegmentType: "line" },
                                { X: halfX, Y: halfY }];

        var builder = new JsonPathBuilder.JsonPathBuilder();
        this._path = <Path.Path>builder.load(t, pathDefinition);
        var shape = new Shape.Shape(this._path);
        
        super(shape);
    }
}
