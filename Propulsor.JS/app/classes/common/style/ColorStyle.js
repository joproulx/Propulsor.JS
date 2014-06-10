define(["require", "exports", "classes/common/style/Color"], function(require, exports, Color) {
    
    var ColorStyle = (function () {
        function ColorStyle(color, opacity) {
            this.Color = color;
            this.Opacity = opacity;
        }
        ColorStyle.fromRgb = function (r, g, b) {
            return new ColorStyle(new Color(r, g, b), 1);
        };

        ColorStyle.fromArray = function (rgba) {
            return new ColorStyle(new Color(rgba[0], rgba[1], rgba[2]), rgba.length === 4 ? rgba[3] : 1);
        };

        ColorStyle.prototype.toRgbaString = function () {
            return 'rgba(' + this.Color.R + ',' + this.Color.G + ',' + this.Color.B + ',' + this.Opacity + ')';
        };

        ColorStyle.fromRgbString = function (rgb) {
            var match = rgb.match(ColorStyle.RegexRGBa);
            if (match) {
                var r = parseInt(match[1], 10) / (/%$/.test(match[1]) ? 100 : 1) * (/%$/.test(match[1]) ? 255 : 1), g = parseInt(match[2], 10) / (/%$/.test(match[2]) ? 100 : 1) * (/%$/.test(match[2]) ? 255 : 1), b = parseInt(match[3], 10) / (/%$/.test(match[3]) ? 100 : 1) * (/%$/.test(match[3]) ? 255 : 1), a = match[4] ? parseFloat(match[4]) : 1;

                return new ColorStyle(new Color(r, g, b), a);
            }
            return ColorStyle.Black;
        };

        ColorStyle.prototype.toString = function () {
            return 'rgba(' + Math.round(this.Color.R) + ', ' + Math.round(this.Color.G) + ', ' + Math.round(this.Color.B) + ', ' + this.Opacity + ')';
        };
        ColorStyle.RegexRGBa = /^rgba?\(\s*(\d{1,3}\%?)\s*,\s*(\d{1,3}\%?)\s*,\s*(\d{1,3}\%?)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/;

        ColorStyle.RegexHSLa = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/;

        ColorStyle.RegexHex = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i;

        ColorStyle.White = new ColorStyle(Color.White, 1);
        ColorStyle.Black = new ColorStyle(Color.Black, 1);
        ColorStyle.Blue = new ColorStyle(Color.Blue, 1);
        ColorStyle.Aqua = new ColorStyle(Color.Aqua, 1);
        ColorStyle.Fuchsia = new ColorStyle(Color.Fuchsia, 1);
        ColorStyle.Gray = new ColorStyle(Color.Gray, 1);
        ColorStyle.Green = new ColorStyle(Color.Green, 1);
        ColorStyle.Lime = new ColorStyle(Color.Lime, 1);
        ColorStyle.Maroon = new ColorStyle(Color.Maroon, 1);
        ColorStyle.Navy = new ColorStyle(Color.Navy, 1);
        ColorStyle.Olive = new ColorStyle(Color.Olive, 1);
        ColorStyle.Purple = new ColorStyle(Color.Purple, 1);
        ColorStyle.Red = new ColorStyle(Color.Red, 1);
        ColorStyle.Silver = new ColorStyle(Color.Silver, 1);
        ColorStyle.Teal = new ColorStyle(Color.Teal, 1);
        ColorStyle.Yellow = new ColorStyle(Color.Yellow, 1);
        ColorStyle.Transparent = new ColorStyle(Color.White, 0);
        return ColorStyle;
    })();
    return ColorStyle;
});
//# sourceMappingURL=ColorStyle.js.map
