var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "element/shape/Shape", "element/shape/ShapeDecorator", "element/path/JsonPathBuilder"], function(require, exports, __Shape__, __ShapeDecorator__, __JsonPathBuilder__) {
    var Shape = __Shape__;

    var ShapeDecorator = __ShapeDecorator__;

    var JsonPathBuilder = __JsonPathBuilder__;

    
    
    var ArrowShape = (function (_super) {
        __extends(ArrowShape, _super);
        function ArrowShape(t) {
            var pathDefinition = new JsonPathBuilder.JsonPathDefinition();
            pathDefinition.IsClosedPath = true;
            pathDefinition.Origin = {
                X: 0,
                Y: 25
            };
            pathDefinition.Items = [
                {
                    X: 0,
                    Y: -25
                }, 
                {
                    SegmentType: "line"
                }, 
                {
                    X: 50,
                    Y: 0
                }, 
                {
                    SegmentType: "line"
                }, 
                {
                    X: 0,
                    Y: 25
                }, 
                {
                    SegmentType: "line"
                }
            ];
            var builder = new JsonPathBuilder.JsonPathBuilder();
            var path = builder.load(t, pathDefinition);
            var shape = new Shape.Shape(path);
                _super.call(this, shape);
        }
        return ArrowShape;
    })(ShapeDecorator.ShapeDecorator);
    exports.ArrowShape = ArrowShape;    
})
