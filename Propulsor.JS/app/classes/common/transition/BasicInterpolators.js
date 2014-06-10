define(["require", "exports", 'classes/common/transition/Interpolator', 'classes/common/Point', "classes/common/style/Color"], function(require, exports, Interpolator, Point, Color) {
    

    var BasicInterpolators = (function () {
        function BasicInterpolators() {
        }
        BasicInterpolators.Numeric = new Interpolator(function (t, start, end, ratio) {
            if (start === end) {
                return start;
            }
            return (ratio * (end - start)) + start;
        });

        BasicInterpolators.Point = new Interpolator(function (t, start, end, ratio) {
            return new Point(BasicInterpolators.Numeric.getValue(t, start.X, end.X, ratio), BasicInterpolators.Numeric.getValue(t, start.Y, end.Y, ratio));
        });

        BasicInterpolators.Color = new Interpolator(function (t, start, end, ratio) {
            var r = BasicInterpolators.Numeric.getValue(t, start.R, end.R, ratio);
            var g = BasicInterpolators.Numeric.getValue(t, start.G, end.G, ratio);
            var b = BasicInterpolators.Numeric.getValue(t, start.B, end.B, ratio);
            return new Color(r, g, b);
        });
        return BasicInterpolators;
    })();
    return BasicInterpolators;
});
//# sourceMappingURL=BasicInterpolators.js.map
