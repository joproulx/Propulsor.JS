define(["require", "exports", "classes/common/timedValue/NumericTimedValue"], function(require, exports, NumericTimedValue) {
    
    var Segment = (function () {
        function Segment() {
            this.Joint1 = null;
            this.Joint2 = null;
            this.StartRatio = new NumericTimedValue(0);
            this.EndRatio = new NumericTimedValue(1);
        }
        Segment.prototype.setJoints = function (joint1, joint2) {
            this.Joint1 = joint1;
            this.Joint2 = joint2;
        };
        Segment.prototype.getDrawnRatios = function () {
            return null;
        };
        Segment.prototype.length = function (t) {
            return 0;
        };
        Segment.prototype.pointFromRatio = function (t, ratio) {
            return null;
        };
        Segment.prototype.tangentAngleFromRatio = function (t, ratio) {
            return 0;
        };

        // TODO: Remove reference to SegmentRenderer. Use IElementRenderer interface?
        Segment.prototype.createSegmentRenderer = function () {
            return null;
        };
        return Segment;
    })();
    return Segment;
});
//# sourceMappingURL=Segment.js.map
