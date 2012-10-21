import Segment = module("element/segment/Segment");

export class Path {
    Segments: Segment.Segment[];
    isClosedPath: bool;

    constructor (segments: Segment.Segment[], isClosedPath: bool) {
        this.Segments = segments;
        this.isClosedPath = isClosedPath;
    }
    length(t: number) {
        var length = 0;
        for (var i = 0; i < this.Segments.length; i++) {
            length += this.Segments[i].length(t);
        }
        return length;
    }
    getPointFromRatio(t: number, ratio: number) {
        var segment = this.getSegmentFromRatio(t, ratio);
        if (segment != null) {
            return segment.Segment.pointFromRatio(t, segment.Ratio);
        }
        return null;
    }
    getTangentAngleFromRatio(t: number, ratio: number) {
        var segment = this.getSegmentFromRatio(t, ratio);
        if (segment != null) {
            return segment.Segment.tangentAngleFromRatio(t, segment.Ratio);
        }
        return null;
    }
    getSegmentFromRatio(t: number, ratio: number) {
        if (ratio < 0 || ratio > 1) {
            throw "Invalid parameter: ratio. Must be between 0 and 1.";
        }

        var length = this.length(t);
        var currentLength = 0;

        for (var i = 0; i < this.Segments.length; i++) {
            var previousLength = currentLength;

            currentLength += this.Segments[i].length(t);

            var ratio1 = previousLength / length;
            var ratio2 = currentLength / length;

            if (ratio >= ratio1 && ratio <= ratio2) {
                return {
                    Ratio: (ratio - ratio1) / (ratio2 - ratio1),
                    Segment: this.Segments[i]
                }
            }
        }
        return null;
    }
}