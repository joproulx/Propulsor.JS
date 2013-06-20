var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "element/shape/Shape", "element/shape/ShapeDecorator", "element/path/JsonPathBuilder"], function(require, exports, __Shape__, __ShapeDecorator__, __JsonPathBuilder__) {
    var Shape = __Shape__;

    var ShapeDecorator = __ShapeDecorator__;

    var JsonPathBuilder = __JsonPathBuilder__;

    
    
    var LineShape = (function (_super) {
        __extends(LineShape, _super);
        function LineShape(t, x1, y1, x2, y2) {
            var pathDefinition = new JsonPathBuilder.JsonPathDefinition();
            var halfX = (x2 - x1) / 2;
            var halfY = (y2 - y1) / 2;
            pathDefinition.IsClosedPath = false;
            pathDefinition.Origin = {
                X: (x1 + halfX),
                Y: (y1 + halfY)
            };
            pathDefinition.Items = [
                {
                    X: -halfX,
                    Y: -halfY
                }, 
                {
                    SegmentType: "line"
                }, 
                {
                    X: halfX,
                    Y: halfY
                }
            ];
            var builder = new JsonPathBuilder.JsonPathBuilder();
            this._path = builder.load(t, pathDefinition);
            var shape = new Shape.Shape(this._path);
                _super.call(this, shape);
        }
        return LineShape;
    })(ShapeDecorator.ShapeDecorator);
    exports.LineShape = LineShape;    
})
