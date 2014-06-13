import Shape = require("classes/element/shape/Shape");
import ShapeDecorator = require("classes/element/shape/ShapeDecorator");
import Path = require("classes/element/path/Path");
import Point = require("classes/common/Point");

export = LineShape;
class LineShape extends ShapeDecorator{
    _path: Path;

    constructor (t: number, x1: number, y1: number, x2: number, y2: number) {
        //var pathDefinition = new JsonPathDefinition();

        //var halfX = (x2 - x1) / 2;
        //var halfY = (y2 - y1) / 2;

        //pathDefinition.IsClosedPath= false;
        //pathDefinition.Origin = { X: (x1 + halfX), Y: (y1 + halfY) };
        //pathDefinition.Items = [{ X: -halfX, Y: -halfY },
        //                        { SegmentType: "line" },
        //                        { X: halfX, Y: halfY }];

        //var builder = new JsonPathBuilder.JsonPathBuilder();

        this._path = Path
            .startAt(new Point(x1, y1), t)
            .addSegmentTo(new Point(x2, y2), t);

        var shape = new Shape(this._path);
        
        super(shape);
    }
}
