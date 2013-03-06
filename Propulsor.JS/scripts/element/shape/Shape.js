var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "common/GuidGenerator", "element/shape/IRenderable", "common/timedValue/LinearTimedValue", "common/timedValue/TimedValue", "element/renderer/ShapeRenderer", "scene/SceneNode", "element/Movable"], function(require, exports, __GuidGenerator__, __IRenderable__, __LinearTimedValue__, __TimedValue__, __ShapeRenderer__, __SceneNode__, __Movable__) {
    var GuidGenerator = __GuidGenerator__;

    var IRenderable = __IRenderable__;

    var LinearTimedValue = __LinearTimedValue__;

    var TimedValue = __TimedValue__;

    var ShapeRenderer = __ShapeRenderer__;

    
    var SceneNode = __SceneNode__;

    var Movable = __Movable__;

    var StrokeConfiguration = (function () {
        function StrokeConfiguration() {
            this.Ratio = new Ratio();
            this.Dash = new Dash();
            this.Style = ColorStyle.Blue;
        }
        return StrokeConfiguration;
    })();
    exports.StrokeConfiguration = StrokeConfiguration;    
    var DrawStyle = (function () {
        function DrawStyle() { }
        DrawStyle.prototype.toString = function () {
            return "";
        };
        return DrawStyle;
    })();
    exports.DrawStyle = DrawStyle;    
    var Color = (function () {
        function Color(r, g, b) {
            this.R = r;
            this.G = g;
            this.B = b;
        }
        Color.White = new Color(255, 255, 255);
        Color.Black = new Color(0, 0, 0);
        Color.Blue = new Color(0, 0, 255);
        return Color;
    })();
    exports.Color = Color;    
    var ColorStyle = (function (_super) {
        __extends(ColorStyle, _super);
        function ColorStyle(color, opacity) {
                _super.call(this);
            this.Color = color;
            this.Opacity = opacity;
        }
        ColorStyle.fromRgb = function fromRgb(r, g, b) {
            return new ColorStyle(new Color(r, g, b), 1);
        }
        ColorStyle.White = new ColorStyle(Color.White, 1);
        ColorStyle.Black = new ColorStyle(Color.Black, 1);
        ColorStyle.Blue = new ColorStyle(Color.Blue, 1);
        ColorStyle.prototype.toString = function () {
            return 'rgba(' + Math.round(this.Color.R) + ', ' + Math.round(this.Color.G) + ', ' + Math.round(this.Color.B) + ', ' + this.Opacity + ')';
        };
        return ColorStyle;
    })(DrawStyle);
    exports.ColorStyle = ColorStyle;    
    var FillConfiguration = (function () {
        function FillConfiguration() {
            this.Style = ColorStyle.Black;
        }
        return FillConfiguration;
    })();
    exports.FillConfiguration = FillConfiguration;    
    var Dash = (function () {
        function Dash() {
            this.Offset = new LinearTimedValue.LinearTimedValue(0);
            this.Pattern = new TimedValue.TimedValue(null);
            this.Pattern.set(0, [
                -1
            ]);
        }
        return Dash;
    })();
    exports.Dash = Dash;    
    var Ratio = (function () {
        function Ratio() {
            this.Start = new LinearTimedValue.LinearTimedValue(0);
            this.End = new LinearTimedValue.LinearTimedValue(1);
        }
        return Ratio;
    })();
    exports.Ratio = Ratio;    
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
