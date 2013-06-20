import Shape = module("element/shape/Shape");
import ShapeDecorator = module("element/shape/ShapeDecorator");
import JsonPathBuilder = module("element/path/JsonPathBuilder");
import Path = module("element/path/Path");
import Point = module("common/Point");

export class ArrowShape extends ShapeDecorator.ShapeDecorator{
    constructor (t: number) {
        var pathDefinition = new JsonPathBuilder.JsonPathDefinition();
        
        pathDefinition.IsClosedPath= true;
        pathDefinition.Origin = { X: 0, Y: 25 };
        pathDefinition.Items = [{ X: 0, Y: -25 },
                { SegmentType: "line" },
                { X: 50, Y: 0 },
                { SegmentType: "line" },
                { X: 0, Y: 25 },
                { SegmentType: "line" }];

        var builder = new JsonPathBuilder.JsonPathBuilder();
        var path = builder.load(t, pathDefinition);
        var shape = new Shape.Shape(path);
        
        super(shape);
    }
}