import IDrawStyle = require("classes/common/style/IDrawStyle");
import Color = require("classes/common/style/Color");

export = ColorStyle;
class ColorStyle implements IDrawStyle { 
    Color: Color;
    Opacity: number;

    constructor (color: Color, opacity: number) { 
        this.Color = color;
        this.Opacity = opacity;
    }

    /**
   * Regex matching color in RGB or RGBA formats (ex: rgb(0, 0, 0), rgba(255, 100, 10, 0.5), rgba( 255 , 100 , 10 , 0.5 ), rgb(1,1,1), rgba(100%, 60%, 10%, 0.5))
   */
    private static RegexRGBa = /^rgba?\(\s*(\d{1,3}\%?)\s*,\s*(\d{1,3}\%?)\s*,\s*(\d{1,3}\%?)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/;

  /**
   * Regex matching color in HSL or HSLA formats (ex: hsl(200, 80%, 10%), hsla(300, 50%, 80%, 0.5), hsla( 300 , 50% , 80% , 0.5 ))
   */
    private static RegexHSLa = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/;

  /**
   * Regex matching color in HEX format (ex: #FF5555, 010155, aff)
   */
    private static RegexHex = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i;
    
    public static fromRgb(r: number, g: number, b: number): ColorStyle { return new ColorStyle(new Color(r, g, b), 1); }

    public static fromArray(rgba: number[]): ColorStyle
    {
        return new ColorStyle(new Color(rgba[0], rgba[1], rgba[2]), rgba.length === 4 ? rgba[3] : 1);
    }
    
    public toRgbaString(): string {
        return 'rgba(' + this.Color.R + ',' + this.Color.G + ',' + this.Color.B + ',' + this.Opacity + ')';
    }

    static fromRgbString(rgb): ColorStyle {
        var match = rgb.match(ColorStyle.RegexRGBa);
        if (match) {
            var r = parseInt(match[1], 10) / (/%$/.test(match[1]) ? 100 : 1) * (/%$/.test(match[1]) ? 255 : 1),
                g = parseInt(match[2], 10) / (/%$/.test(match[2]) ? 100 : 1) * (/%$/.test(match[2]) ? 255 : 1),
                b = parseInt(match[3], 10) / (/%$/.test(match[3]) ? 100 : 1) * (/%$/.test(match[3]) ? 255 : 1),
                a = <number>match[4] ? <number>parseFloat(match[4]) : 1;

            return new ColorStyle(new Color(r, g, b), a);
        }
        return ColorStyle.Black;
    }



    static White: ColorStyle = new ColorStyle(Color.White, 1);
    static Black: ColorStyle = new ColorStyle(Color.Black, 1);
    static Blue: ColorStyle = new ColorStyle(Color.Blue, 1);
    static Aqua: ColorStyle = new ColorStyle(Color.Aqua, 1);
    static Fuchsia: ColorStyle = new ColorStyle(Color.Fuchsia, 1);
    static Gray: ColorStyle = new ColorStyle(Color.Gray, 1);
    static Green: ColorStyle = new ColorStyle(Color.Green, 1);
    static Lime: ColorStyle = new ColorStyle(Color.Lime, 1);
    static Maroon: ColorStyle = new ColorStyle(Color.Maroon, 1);
    static Navy: ColorStyle = new ColorStyle(Color.Navy, 1);
    static Olive: ColorStyle = new ColorStyle(Color.Olive, 1);
    static Purple: ColorStyle = new ColorStyle(Color.Purple, 1);
    static Red: ColorStyle = new ColorStyle(Color.Red, 1);
    static Silver: ColorStyle = new ColorStyle(Color.Silver, 1);
    static Teal: ColorStyle = new ColorStyle(Color.Teal, 1);
    static Yellow: ColorStyle = new ColorStyle(Color.Yellow, 1);
    static Transparent: ColorStyle = new ColorStyle(Color.White, 0);
    
    toString(): string { 
        return'rgba(' + Math.round(this.Color.R) + ', ' + Math.round(this.Color.G) + ', ' + Math.round(this.Color.B) + ', ' + this.Opacity + ')';
    }
}
