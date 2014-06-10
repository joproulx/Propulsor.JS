import SegmentRenderer = require("classes/element/renderer/SegmentRenderer");
import Segment = require("classes/element/segment/Segment");
import Shape = require("classes/element/shape/Shape");
import LineJoinTypes = require("classes/common/style/LineJoinTypes");

export = ShapeRenderer;
class ShapeRenderer {
    Shape: Shape;
    IsIndependantShape: boolean;
    SegmentRenderers: SegmentRenderer[];

    constructor (shape) {
        this.Shape = shape;
        this.IsIndependantShape = false;
        this.SegmentRenderers = [];

        var segmentToJoin = null;
        var segment = this.Shape.Path.Segments[0];

        while (1) {
            var newSegment = segment.createSegmentRenderer();

            newSegment.SegmentRenderer1 = segmentToJoin;

            if (!this.Shape.Path.IsClosedPath && segment == this.Shape.Path.Segments[0]) {
                var joint = segment.Joint1;
                var segmentRenderer = joint.createSegmentRenderer();

                if (segmentRenderer != null) {
                    newSegment.SegmentRenderer1 = segmentRenderer;
                    segmentRenderer.SegmentRenderer2 = newSegment;
                    this.SegmentRenderers.push(segmentRenderer);
                }
            }

            if (segmentToJoin != null) {
                segmentToJoin.SegmentRenderer2 = newSegment;
            }

            segmentToJoin = newSegment;

            this.SegmentRenderers.push(newSegment);

            if (segment.Joint2 != null) {
                var joint = segment.Joint2;
                var segmentRenderer = joint.createSegmentRenderer();

                if (segmentRenderer != null) {
                    newSegment.SegmentRenderer2 = segmentRenderer;
                    segmentRenderer.SegmentRenderer1 = newSegment;
                    segmentToJoin = segmentRenderer;

                    this.SegmentRenderers.push(segmentRenderer);
                }
            }

            if (this.isLastSegment(segment)) {
                if (this.Shape.Path.IsClosedPath) {
                    this.SegmentRenderers[0].SegmentRenderer1 = segmentToJoin;
                    segmentToJoin.SegmentRenderer2 = this.SegmentRenderers[0];
                }

                break;
            }

            segment = segment.Joint2.Segment2;
        }
    }
    getRatio(length: number, totalLength: number) : number {
        return length / totalLength;
    }
    getDashedPattern(t: number): number[] {
        return this.Shape.Stroke.Dash.Pattern.get(t);
    }
    isDashed(t: number) {
        return this.getDashedPattern(t).length > 0;
    }
    getDashedSegment(t: number, dashedOffset: number, length: number, dashPattern: number[]) {
        if (dashPattern.length == 0) {
            return { Drawn: true, Length: this.Shape.Path.length(t) - length };
        }

        length = dashedOffset + length;

        var totalDashLength = 0;
        for (var i = 0; i < dashPattern.length; i++) {
            totalDashLength += dashPattern[i];
        }
        length = length % totalDashLength;

        var value = 0;
        var draw = true;
        var result = { Drawn: true, Length: 0 };
        for (var i = 0; i < dashPattern.length; i++) {
            value = value + dashPattern[i];

            if (dashPattern[i] == -1) {
                return { Drawn: true, Length: this.Shape.Path.length(t) - length };
            }

            if (length < value) {
                result.Length = value - length;
                result.Drawn = draw;
                break;
            }

            draw = !draw;
        }
        return result;
    }
    render(t: number, context: any) {

        var needTwoPasses = this.Shape.Path.IsClosedPath && this.isDashed(t);
        var firstPass = true;

        do {
            var startRatio = this.Shape.Stroke.Ratio.Start.get(t);
            var endRatio = this.Shape.Stroke.Ratio.End.get(t);

            var length = this.Shape.Path.length(t);

            var totalStartLength = length * startRatio;
            var totalEndLength = length * endRatio;

            length = length * endRatio;

            var currentTotalLength = totalStartLength;
            var totalSegmentLength = 0;

            var beginPath = true;
            var endPath = true;


            for (var i = 0; i < this.SegmentRenderers.length; i++) {
                var segmentLength = this.SegmentRenderers[i].Segment.length(t);

                var reachedEnd = false;
                do {
                    var dashPattern = (needTwoPasses && firstPass) ? [-1] : this.Shape.Stroke.Dash.Pattern.get(t);

                    var dashedSegment = this.getDashedSegment(t, this.Shape.Stroke.Dash.Offset.get(t), currentTotalLength, dashPattern);
                    var endLength = dashedSegment.Length;
                    var newCurrentTotalLength = (currentTotalLength + endLength);
                    var newTotalSegmentLength = (totalSegmentLength + segmentLength);

                    if (newCurrentTotalLength >= newTotalSegmentLength) {

                        // Only do a endRender() if we are not at a joint and there is still a segment to draw OR
                        // if we are at the complete end of the path
                        endPath = newCurrentTotalLength <= newTotalSegmentLength;

                        endLength = newTotalSegmentLength - currentTotalLength;

                        reachedEnd = true;
                    }
                    else {
                        endPath = true;
                    }

                    endPath = endPath && !(needTwoPasses && firstPass && !reachedEnd);

                    if (dashedSegment.Drawn) {

                        var startRatio = this.getRatio((currentTotalLength - totalSegmentLength), segmentLength);
                        var endRatio = this.getRatio((currentTotalLength - totalSegmentLength) + endLength, segmentLength);

                        var point = this.SegmentRenderers[i].getPoint1(t, startRatio, endRatio);

                        if (beginPath) {
                            this.beginRender(t, context, !(needTwoPasses && firstPass), firstPass);
                            context.moveTo(point.X, point.Y);
                        }

                        this.SegmentRenderers[i].render(t, context, startRatio, endRatio);

                        if (endPath && !(needTwoPasses && firstPass && !reachedEnd)) {
                            this.endRender(context, reachedEnd, firstPass);
                        }
                    }

                    beginPath = endPath;
                    currentTotalLength += endLength;

                } while (!reachedEnd);
                totalSegmentLength += segmentLength;
            }
            firstPass = !firstPass;
        } while (needTwoPasses && !firstPass);
    }
    //renderSegment(t: number, context: any, segmentRenderer: SegmentRenderer.SegmentRenderer, startRatio: number, endRatio: number) {
    //    // TODO: When a element is closed and some of its segments are not full (ex.: dash), we need
    //    // to do a 2 passes rendering. One for the element, with a stroke width= 0. A second one for the stroke.
    //    // Since the stroke won't be continuous, we'll need to use more than one path, hence the
    //    // need of a 2 passes render. The problem is that we don't know if there is such a segment
    //    // in the element before iterating through the segments. Find a way to do it.
    //    if (segmentRenderer === _.first(this.SegmentRenderers) ||
    //        segmentRenderer.IsIndependantShape ||
    //        startRatio > 0) {

    //        this.beginRender(t, context);
    //        var point = segmentRenderer.getPoint1(t, startRatio, endRatio);
    //        context.moveTo(point.X, point.Y);
    //    }

    //    segmentRenderer.render(t, context, startRatio, endRatio);

    //    if (segmentRenderer === _.last(this.SegmentRenderers) ||
    //        segmentRenderer.IsIndependantShape ||
    //        endRatio < 1) {
    //        this.endRender(context);
    //    }
    //}
    beginRender(t: number, context: any, drawStroke: boolean, fill: boolean) {
        context.save();
        context.beginPath();
        context.fillStyle = fill ? this.Shape.Fill.Style.toString() : 'rgba(0,0,0,0)';

        // var rgb = this.Shape.StrokeColor.get(t);
        // TODO: optimize how the rgb are passed to canvas
        context.strokeStyle = drawStroke ? this.Shape.Stroke.Style.toString() : this.Shape.Fill.Style.toString();
        context.lineWidth = this.Shape.Stroke.LineWidth.get(t);
        
        switch (this.Shape.Stroke.LineJoinType)
        { 
            case LineJoinTypes.Bevel: context.lineJoin = "bevel"; break;
            case LineJoinTypes.Miter: context.lineJoin = "miter"; break;
            case LineJoinTypes.Round: context.lineJoin = "round"; break;
        }
    }
    endRender(context: any, canClosePath: boolean, fill: boolean) {
        if (canClosePath && this.Shape.Path.IsClosedPath) {
            context.closePath();

            if (fill) {
                context.fill();
            }
        }
        context.stroke();
        context.restore();
    }
    isLastSegment(segment: Segment) {
        return this.Shape.Path.Segments[this.Shape.Path.Segments.length - 1] == segment;
    }
}