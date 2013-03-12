define(["require", "exports", "common/timedValue/TimedValue", "common/timedValue/LinearTimedValue"], function(require, exports, __TimedValue__, __LinearTimedValue__) {
    var TimedValue = __TimedValue__;

    var LinearTimedValue = __LinearTimedValue__;

    (function (LineJoinTypes) {
        LineJoinTypes._map = [];
        LineJoinTypes._map[0] = "Miter";
        LineJoinTypes.Miter = 0;
        LineJoinTypes._map[1] = "Round";
        LineJoinTypes.Round = 1;
        LineJoinTypes._map[2] = "Bevel";
        LineJoinTypes.Bevel = 2;
    })(exports.LineJoinTypes || (exports.LineJoinTypes = {}));
    var LineJoinTypes = exports.LineJoinTypes;
    var StrokeConfiguration = (function () {
        function StrokeConfiguration() {
            this.Ratio = new Ratio();
            this.Dash = new Dash();
            this.Style = ColorStyle.Black;
            this.LineWidth = new LinearTimedValue.LinearTimedValue(1);
        }
        return StrokeConfiguration;
    })();
    exports.StrokeConfiguration = StrokeConfiguration;    
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
    var ColorStyle = (function () {
        function ColorStyle(color, opacity) {
            this.Color = color;
            this.Opacity = opacity;
        }
        ColorStyle.fromRgb = function fromRgb(r, g, b) {
            return new ColorStyle(new Color(r, g, b), 1);
        }
        ColorStyle.White = new ColorStyle(Color.White, 1);
        ColorStyle.Black = new ColorStyle(Color.Black, 1);
        ColorStyle.Blue = new ColorStyle(Color.Blue, 1);
        ColorStyle.Transparent = new ColorStyle(Color.White, 0);
        ColorStyle.prototype.toString = function () {
            return 'rgba(' + Math.round(this.Color.R) + ', ' + Math.round(this.Color.G) + ', ' + Math.round(this.Color.B) + ', ' + this.Opacity + ')';
        };
        return ColorStyle;
    })();
    exports.ColorStyle = ColorStyle;    
    var FillConfiguration = (function () {
        function FillConfiguration() {
            this.Style = ColorStyle.Transparent;
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
})
