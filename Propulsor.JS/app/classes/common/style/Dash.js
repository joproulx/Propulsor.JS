define(["require", "exports", "classes/common/timedValue/NumericTimedValue", "classes/common/timedValue/ArrayTimedValue", "classes/common/transition/interpolation/BasicInterpolators"], function(require, exports, NumericTimedValue, ArrayTimedValue, BasicInterpolators) {
    
    var Dash = (function () {
        function Dash() {
            this.Offset = new NumericTimedValue(0);
            this.Pattern = new ArrayTimedValue([], BasicInterpolators.Numeric);
            // TODO: Create a transition for the dash pattern array
        }
        return Dash;
    })();
    return Dash;
});
//# sourceMappingURL=Dash.js.map
