var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "element/joint/Joint"], function(require, exports, __Joint__) {
    var Joint = __Joint__;

    
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
    })(Joint.Joint);
    exports.EndPoint = EndPoint;    
})
