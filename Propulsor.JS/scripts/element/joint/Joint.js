var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "element/Movable"], function(require, exports, __Movable__) {
    
    
    var Movable = __Movable__;

    var Joint = (function (_super) {
        __extends(Joint, _super);
        function Joint(sceneNode) {
                _super.call(this, sceneNode);
        }
        Joint.prototype.setSegments = function (segment1, segment2) {
            this.Segment1 = segment1;
            this.Segment2 = segment2;
        };
        Joint.prototype.getOtherSegment = function (segment) {
            return (segment == this.Segment1) ? this.Segment2 : this.Segment1;
        };
        Joint.prototype.createSegmentRenderer = function () {
            return null;
        };
        return Joint;
    })(Movable.Movable);
    exports.Joint = Joint;    
})
