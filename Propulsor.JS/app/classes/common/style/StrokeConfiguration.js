define(["require", "exports", "classes/common/Ratio", "classes/common/style/Dash", "classes/common/style/LineJoinTypes", "classes/common/timedValue/NumericTimedValue", "classes/common/style/ColorStyle"], function(require, exports, Ratio, Dash, LineJoinTypes, NumericTimedValue, ColorStyle) {
    
    var StrokeConfiguration = (function () {
        function StrokeConfiguration() {
            this.Ratio = new Ratio();
            this.Dash = new Dash();
            this.Style = ColorStyle.Black;
            this.LineWidth = new NumericTimedValue(1);
            this.LineJoinType = 0 /* Miter */;
        }
        return StrokeConfiguration;
    })();
    return StrokeConfiguration;
});
//# sourceMappingURL=StrokeConfiguration.js.map
