define(["require", "exports", "libs/underscore/underscoreLib"], function(require, exports, __underscore__) {
    
    
    var underscore = __underscore__;

    var _ = underscore;
    var ShapeRenderer = (function () {
        function ShapeRenderer(shape) {
            this.Shape = shape;
            this.IsIndependantShape = false;
            this.SegmentRenderers = [];
            var segmentToJoin = null;
            var segment = this.Shape.Path.Segments[0];
            while(1) {
                var newSegment = segment.createSegmentRenderer();
                newSegment.SegmentRenderer1 = segmentToJoin;
                if(!this.Shape.Path.isClosedPath && segment == this.Shape.Path.Segments[0]) {
                    var joint = segment.Joint1;
                    var segmentRenderer = joint.createSegmentRenderer();
                    if(segmentRenderer != null) {
                        newSegment.SegmentRenderer1 = segmentRenderer;
                        segmentRenderer.SegmentRenderer2 = newSegment;
                        this.SegmentRenderers.push(segmentRenderer);
                    }
                }
                if(segmentToJoin != null) {
                    segmentToJoin.SegmentRenderer2 = newSegment;
                }
                segmentToJoin = newSegment;
                this.SegmentRenderers.push(newSegment);
                if(segment.Joint2 != null) {
                    var joint = segment.Joint2;
                    var segmentRenderer = joint.createSegmentRenderer();
                    if(segmentRenderer != null) {
                        newSegment.SegmentRenderer2 = segmentRenderer;
                        segmentRenderer.SegmentRenderer1 = newSegment;
                        segmentToJoin = segmentRenderer;
                        this.SegmentRenderers.push(segmentRenderer);
                    }
                }
                if(this.isLastSegment(segment)) {
                    if(this.Shape.Path.isClosedPath) {
                        this.SegmentRenderers[0].SegmentRenderer1 = segmentToJoin;
                        segmentToJoin.SegmentRenderer2 = this.SegmentRenderers[0];
                    }
                    break;
                }
                segment = segment.Joint2.Segment2;
            }
        }
        ShapeRenderer.prototype.getRatio = function (length, totalLength) {
            return length / totalLength;
        };
        ShapeRenderer.prototype.getDashedSegment = function (t, dashedOffset, length) {
            var dashPattern = this.Shape.StrokeDashPattern.get(t);
            var dashPatternLength = dashPattern.length;
            if(dashPatternLength == 1 && dashPattern[0] == -1) {
                return {
                    Drawn: true,
                    Length: this.Shape.Path.length(t) - length
                };
            }
            var dashPatternLength = dashPattern.length;
            if(dashPatternLength == 0) {
                throw "DashPattern must be an array of at least one item.";
            }
            length = dashedOffset + length;
            var totalDashLength = 0;
            for(var i = 0; i < dashPattern.length; i++) {
                totalDashLength += dashPattern[i];
            }
            length = length % totalDashLength;
            var value = 0;
            var draw = true;
            var result = {
                Drawn: true,
                Length: 0
            };
            for(var i = 0; i < dashPattern.length; i++) {
                value = value + dashPattern[i];
                if(dashPattern[i] == -1) {
                    return {
                        Drawn: true,
                        Length: this.Shape.Path.length(t) - length
                    };
                }
                if(length < value) {
                    result.Length = value - length;
                    result.Drawn = draw;
                    break;
                }
                draw = !draw;
            }
            return result;
        };
        ShapeRenderer.prototype.render = function (t, context) {
            var startRatio = this.Shape.StrokeRatio.Start.get(t);
            var endRatio = this.Shape.StrokeRatio.End.get(t);
            var length = this.Shape.Path.length(t);
            var totalStartLength = length * startRatio;
            var totalEndLength = length * endRatio;
            length = length * endRatio;
            var currentTotalLength = totalStartLength;
            var totalSegmentLength = 0;
            var beginPath = true;
            var endPath = true;
            for(var i = 0; i < this.SegmentRenderers.length; i++) {
                var segmentLength = this.SegmentRenderers[i].Segment.length(t);
                var reachedEnd = false;
                do {
                    var dashedSegment = this.getDashedSegment(t, this.Shape.StrokeDashOffset.get(t), currentTotalLength);
                    var endLength = dashedSegment.Length;
                    var newCurrentTotalLength = (currentTotalLength + endLength);
                    var newTotalSegmentLength = (totalSegmentLength + segmentLength);
                    if(newCurrentTotalLength >= newTotalSegmentLength) {
                        endPath = newCurrentTotalLength <= newTotalSegmentLength;
                        endLength = newTotalSegmentLength - currentTotalLength;
                        reachedEnd = true;
                    } else {
                        endPath = true;
                    }
                    if(dashedSegment.Drawn) {
                        var startRatio = this.getRatio((currentTotalLength - totalSegmentLength), segmentLength);
                        var endRatio = this.getRatio((currentTotalLength - totalSegmentLength) + endLength, segmentLength);
                        var point = this.SegmentRenderers[i].getPoint1(t, startRatio, endRatio);
                        if(beginPath) {
                            this.beginRender(t, context);
                            context.moveTo(point.X, point.Y);
                        }
                        this.SegmentRenderers[i].render(t, context, startRatio, endRatio);
                        if(endPath) {
                            this.endRender(context);
                        }
                    }
                    beginPath = endPath;
                    currentTotalLength += endLength;
                }while(!reachedEnd)
                totalSegmentLength += segmentLength;
            }
        };
        ShapeRenderer.prototype.renderSegment = function (t, context, segmentRenderer, startRatio, endRatio) {
            if(segmentRenderer === _.first(this.SegmentRenderers) || segmentRenderer.IsIndependantShape || startRatio > 0) {
                this.beginRender(t, context);
                var point = segmentRenderer.getPoint1(t, startRatio, endRatio);
                context.moveTo(point.X, point.Y);
            }
            segmentRenderer.render(t, context, startRatio, endRatio);
            if(segmentRenderer === _.last(this.SegmentRenderers) || segmentRenderer.IsIndependantShape || endRatio < 1) {
                this.endRender(context);
            }
        };
        ShapeRenderer.prototype.beginRender = function (t, context) {
            var strokeStyle = '#696969';
            var lineWidth = 5;
            context.save();
            context.beginPath();
            context.fillStyle = strokeStyle;
            context.strokeStyle = strokeStyle;
            context.lineWidth = lineWidth;
            context.lineJoin = "miter";
        };
        ShapeRenderer.prototype.endRender = function (context) {
            if(this.Shape.Path.isClosedPath) {
                context.closePath();
            }
            context.stroke();
            context.restore();
        };
        ShapeRenderer.prototype.isLastSegment = function (segment) {
            return this.Shape.Path.Segments[this.Shape.Path.Segments.length - 1] == segment;
        };
        return ShapeRenderer;
    })();
    exports.ShapeRenderer = ShapeRenderer;    
})

