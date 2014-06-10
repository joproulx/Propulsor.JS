var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "classes/element/shape/Shape", "classes/element/shape/ShapeDecorator", "classes/element/path/Path", "classes/common/Point"], function(require, exports, Shape, ShapeDecorator, Path, Point) {
    
    var LineShape = (function (_super) {
        __extends(LineShape, _super);
        function LineShape(t, x1, y1, x2, y2) {
            //var pathDefinition = new JsonPathDefinition();
            //var halfX = (x2 - x1) / 2;
            //var halfY = (y2 - y1) / 2;
            //pathDefinition.IsClosedPath= false;
            //pathDefinition.Origin = { X: (x1 + halfX), Y: (y1 + halfY) };
            //pathDefinition.Items = [{ X: -halfX, Y: -halfY },
            //                        { SegmentType: "line" },
            //                        { X: halfX, Y: halfY }];
            //var builder = new JsonPathBuilder.JsonPathBuilder();
            this._path = Path.startAt(t, new Point(x1, y1)).addSegmentTo(t, new Point(x2, y2));

            var shape = new Shape(this._path);

            _super.call(this, shape);
        }
        return LineShape;
    })(ShapeDecorator);
    return LineShape;
});
//# sourceMappingURL=LineShape.js.map
