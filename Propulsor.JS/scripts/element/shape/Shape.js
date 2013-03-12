var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "common/GuidGenerator", "element/shape/IRenderable", "element/renderer/ShapeRenderer", "sceneGraph/SceneNode", "element/Movable", "element/renderer/drawingContext/DrawingStyle"], function(require, exports, __GuidGenerator__, __IRenderable__, __ShapeRenderer__, __SceneNode__, __Movable__, __DrawingStyle__) {
    var GuidGenerator = __GuidGenerator__;

    var IRenderable = __IRenderable__;

    
    
    var ShapeRenderer = __ShapeRenderer__;

    
    var SceneNode = __SceneNode__;

    var Movable = __Movable__;

    var DrawingStyle = __DrawingStyle__;

    var Shape = (function (_super) {
        __extends(Shape, _super);
        function Shape(path) {
                _super.call(this, path);
            this.Id = GuidGenerator.generateGuid();
            this.Renderer = null;
            this.Path = path;
            this.Stroke = new DrawingStyle.StrokeConfiguration();
            this.Fill = new DrawingStyle.FillConfiguration();
        }
        Shape.prototype.createShapeRenderer = function () {
            return new ShapeRenderer.ShapeRenderer(this);
        };
        Shape.prototype.render = function (t, context) {
            if(this.Renderer == null) {
                this.Renderer = this.createShapeRenderer();
            }
            this.Renderer.render(t, context);
        };
        return Shape;
    })(Movable.MovableWrapper);
    exports.Shape = Shape;    
})
