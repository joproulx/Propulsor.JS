import IInterpolator = require('classes/common/transition/interpolation/IInterpolator');
import Interpolator = require('classes/common/transition/interpolation/Interpolator');
import Point = require('classes/common/Point');
import Color = require("classes/common/style/Color");

export = BasicInterpolators;

class BasicInterpolators {
    public static Numeric: IInterpolator<number> = new Interpolator<number>(function (t: number, start: number, end: number, ratio: number): number {
        if (start === end) {
            return start;
        }
        return (ratio * (end - start)) + start;
    });

    public static Point: IInterpolator<Point> = new Interpolator<Point>(function (t: number, start: Point, end: Point, ratio: number): Point {
        return new Point(BasicInterpolators.Numeric.getValue(t, start.X, end.X, ratio),
                         BasicInterpolators.Numeric.getValue(t, start.Y, end.Y, ratio));
    });

    public static Color: IInterpolator<Color> = new Interpolator<Color>(function (t: number, start: Color, end: Color, ratio: number): Color {
        var r = BasicInterpolators.Numeric.getValue(t, start.R, end.R, ratio);
        var g = BasicInterpolators.Numeric.getValue(t, start.G, end.G, ratio);
        var b = BasicInterpolators.Numeric.getValue(t, start.B, end.B, ratio);
        return new Color(r, g, b);
    });
}