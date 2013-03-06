var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "element/Movable", "scene/SceneNode"], function(require, exports, __Movable__, __SceneNode__) {
    
    
    var Movable = __Movable__;

    var SceneNode = __SceneNode__;

    
    var Path = (function (_super) {
        __extends(Path, _super);
        function Path(sceneNode, segments, joints, isClosedPath) {
            this.Segments = segments;
            this.Joints = joints;
            this.IsClosedPath = isClosedPath;
                _super.call(this, sceneNode);
        }
        Path.prototype.length = function (t) {
            var length = 0;
            for(var i = 0; i < this.Segments.length; i++) {
                length += this.Segments[i].length(t);
            }
            return length;
        };
        Path.prototype.getPointFromRatio = function (t, ratio) {
            var segment = this.getSegmentFromRatio(t, ratio);
            if(segment != null) {
                return segment.Segment.pointFromRatio(t, segment.Ratio);
            }
            return null;
        };
        Path.prototype.getTangentAngleFromRatio = function (t, ratio) {
            var segment = this.getSegmentFromRatio(t, ratio);
            if(segment != null) {
                return segment.Segment.tangentAngleFromRatio(t, segment.Ratio);
            }
            return null;
        };
        Path.prototype.getSegmentFromRatio = function (t, ratio) {
            if(ratio < 0 || ratio > 1) {
                throw "Invalid parameter: ratio. Must be between 0 and 1.";
            }
            var length = this.length(t);
            var currentLength = 0;
            for(var i = 0; i < this.Segments.length; i++) {
                var previousLength = currentLength;
                currentLength += this.Segments[i].length(t);
                var ratio1 = previousLength / length;
                var ratio2 = currentLength / length;
                if(ratio >= ratio1 && ratio <= ratio2) {
                    return {
                        Ratio: (ratio - ratio1) / (ratio2 - ratio1),
                        Segment: this.Segments[i]
                    };
                }
            }
            return null;
        };
        return Path;
    })(Movable.Movable);
    exports.Path = Path;    
})
