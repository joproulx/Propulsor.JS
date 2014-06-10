var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "classes/element/Movable"], function(require, exports, Movable) {
    
    var Joint = (function (_super) {
        __extends(Joint, _super);
        function Joint(sceneNode) {
            _super.call(this, sceneNode);
        }
        Joint.prototype.setSegments = function (segment1, segment2) {
            this.Segment1 = segment1;
            this.Segment2 = segment2;
        };

        Joint.prototype.setSegment1 = function (segment) {
            this.Segment1 = segment;
        };
        Joint.prototype.setSegment2 = function (segment) {
            this.Segment2 = segment;
        };
        Joint.prototype.getOtherSegment = function (segment) {
            return (segment == this.Segment1) ? this.Segment2 : this.Segment1;
        };
        Joint.prototype.createSegmentRenderer = function () {
            return null;
        };
        return Joint;
    })(Movable);
    return Joint;
});
//# sourceMappingURL=Joint.js.map
