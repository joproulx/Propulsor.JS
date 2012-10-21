define(["require", "exports", "common/GuidGenerator", "element/shape/IRenderable", "common/timedValue/LinearTimedValue", "common/timedValue/TimedValue", "element/renderer/ShapeRenderer"], function(require, exports, __GuidGenerator__, __IRenderable__, __LinearTimedValue__, __TimedValue__, __ShapeRenderer__) {
    var GuidGenerator = __GuidGenerator__;

    var IRenderable = __IRenderable__;

    var LinearTimedValue = __LinearTimedValue__;

    var TimedValue = __TimedValue__;

    var ShapeRenderer = __ShapeRenderer__;

    var JSonPath = (function () {
        function JSonPath() { }
        return JSonPath;
    })();
    exports.JSonPath = JSonPath;    
    var Shape = (function () {
        function Shape(path) {
            this.Id = GuidGenerator.generateGuid();
            this.Renderer = null;
            this.Path = path;
            this.StrokeColor = new LinearTimedValue.LinearTimedValue({
                R: 0,
                G: 0,
                B: 0
            });
            this.StrokeOpacity = new LinearTimedValue.LinearTimedValue(1);
            this.StrokeRatio = {
                Start: new LinearTimedValue.LinearTimedValue(0),
                End: new LinearTimedValue.LinearTimedValue(1)
            };
            this.StrokeDashOffset = new LinearTimedValue.LinearTimedValue(0);
            this.StrokeDashPattern = new TimedValue.TimedValue(null);
            this.StrokeDashPattern.set(0, [
                -1
            ]);
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
    })();
    exports.Shape = Shape;    
})

