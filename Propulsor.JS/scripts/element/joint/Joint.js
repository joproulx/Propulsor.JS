define(["require", "exports"], function(require, exports) {
    
    
    var Joint = (function () {
        function Joint(sceneNode) {
            this.SceneNode = sceneNode;
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
        Joint.prototype.getPosition = function (t) {
            return this.SceneNode.getPosition(t);
        };
        return Joint;
    })();
    exports.Joint = Joint;    
})

