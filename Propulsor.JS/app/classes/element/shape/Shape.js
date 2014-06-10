var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "classes/common/GuidGenerator", "classes/common/style/StrokeConfiguration", "classes/common/style/FillConfiguration", "classes/element/renderer/ShapeRenderer", "classes/element/MovableWrapper"], function(require, exports, GuidGenerator, StrokeConfiguration, FillConfiguration, ShapeRenderer, MovableWrapper) {
    
    var Shape = (function (_super) {
        __extends(Shape, _super);
        function Shape(path) {
            _super.call(this, path);
            this.Id = GuidGenerator.generateGuid();
            this.Renderer = null;
            this.Path = path;
            this.Stroke = new StrokeConfiguration();
            this.Fill = new FillConfiguration();
        }
        Shape.prototype.createShapeRenderer = function () {
            return new ShapeRenderer(this);
        };
        Shape.prototype.render = function (t, context) {
            if (this.Renderer == null) {
                this.Renderer = this.createShapeRenderer();
            }

            this.Renderer.render(t, context);
        };
        return Shape;
    })(MovableWrapper);
    return Shape;
});
//# sourceMappingURL=Shape.js.map
