define(["require", "exports", "classes/common/timedValue/NumericTimedValue"], function(require, exports, NumericTimedValue) {
    
    var Ratio = (function () {
        function Ratio() {
            this.Start = new NumericTimedValue(0);
            this.End = new NumericTimedValue(1);
        }
        return Ratio;
    })();
    return Ratio;
});
//# sourceMappingURL=Ratio.js.map
