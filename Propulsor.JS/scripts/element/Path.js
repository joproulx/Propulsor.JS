define(["require", "exports"], function(require, exports) {
    
    var Path = (function () {
        function Path(segments, isClosedPath) {
            this.Segments = segments;
            this.isClosedPath = isClosedPath;
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
    })();
    exports.Path = Path;    
})

