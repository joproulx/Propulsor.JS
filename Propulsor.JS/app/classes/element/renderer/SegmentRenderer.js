define(["require", "exports"], function(require, exports) {
    
    var SegmentRenderer = (function () {
        function SegmentRenderer(segment, representCorner) {
            this.Segment = segment;
            this.IsCorner = representCorner;
            this.SegmentRenderer1 = null;
            this.SegmentRenderer2 = null;
        }
        SegmentRenderer.prototype.setAttachedSegments = function (segmentRenderer1, segmentRenderer2) {
            this.SegmentRenderer1 = segmentRenderer1;
            this.SegmentRenderer2 = segmentRenderer2;
        };
        SegmentRenderer.prototype.render = function (t, context, startRatio, endRatio) {
        };
        SegmentRenderer.prototype.getPoint1 = function (t, startRatio, endRatio) {
            return null;
        };
        SegmentRenderer.prototype.getPoint2 = function (t, startRatio, endRatio) {
            return null;
        };
        return SegmentRenderer;
    })();
    return SegmentRenderer;
});
//# sourceMappingURL=SegmentRenderer.js.map
