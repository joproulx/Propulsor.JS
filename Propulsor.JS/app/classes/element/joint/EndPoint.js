var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "classes/element/joint/Joint"], function(require, exports, Joint) {
    
    var EndPoint = (function (_super) {
        __extends(EndPoint, _super);
        function EndPoint(sceneNode) {
            _super.call(this, sceneNode);
        }
        EndPoint.prototype.createSegmentRenderer = function () {
            return null;
        };
        EndPoint.prototype.isStartEndPoint = function () {
            return this.Segment1.Joint1 === this;
        };
        EndPoint.prototype.setSegment = function (segment) {
            return this.setSegments(segment, segment);
        };
        return EndPoint;
    })(Joint);
    return EndPoint;
});
//# sourceMappingURL=EndPoint.js.map
