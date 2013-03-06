define(["require", "exports", "common/timedValue/LinearTimedValue"], function(require, exports, __LinearTimedValue__) {
    var LinearTimedValue = __LinearTimedValue__;

    
    var Segment = (function () {
        function Segment() {
            this.Joint1 = null;
            this.Joint2 = null;
            this.StartRatio = new LinearTimedValue.LinearTimedValue(0);
            this.EndRatio = new LinearTimedValue.LinearTimedValue(1);
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
        Segment.prototype.createSegmentRenderer = function () {
            return null;
        };
        return Segment;
    })();
    exports.Segment = Segment;    
})
