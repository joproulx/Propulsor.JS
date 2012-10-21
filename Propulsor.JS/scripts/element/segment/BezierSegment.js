var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports", "common/Point", "element/renderer/BezierSegmentRenderer", "element/segment/Segment"], function(require, exports, __Point__, __BezierSegmentRenderer__, __Segment__) {
    var Point = __Point__;

    
    var BezierSegmentRenderer = __BezierSegmentRenderer__;

    var Segment = __Segment__;

    
    var LengthCache = (function () {
        function LengthCache() {
            this.Length = 0;
            this.Joint1 = null;
            this.Joint2 = null;
            this.ControlPoint0 = null;
            this.ControlPoint1 = null;
        }
        return LengthCache;
    })();    
    var BezierSegment = (function (_super) {
        __extends(BezierSegment, _super);
        function BezierSegment() {
            this.LengthCache = new LengthCache();
                _super.call(this);
        }
        BezierSegment.prototype.setControlPoints = function (sceneNode1, sceneNode2) {
            this.ControlPoint1 = sceneNode1;
            this.ControlPoint2 = sceneNode2;
        };
        BezierSegment.prototype.createSegmentRenderer = function () {
            return new BezierSegmentRenderer.BezierSegmentRenderer(this);
        };
        BezierSegment.prototype.pointFromRatio = function (t, ratio) {
            var coefficient0 = Math.pow((1 - ratio), 3);
            var coefficient1 = 3 * ratio * Math.pow((1 - ratio), 2);
            var coefficient2 = 3 * ratio * ratio * (1 - ratio);
            var coefficient3 = ratio * ratio * ratio;
            var point0 = this.Joint1.getPosition(t);
            var point1 = this.ControlPoint1.getPosition(t);
            var point2 = this.ControlPoint2.getPosition(t);
            var point3 = this.Joint2.getPosition(t);
            return point0.multiplyBy(coefficient0).add(point1.multiplyBy(coefficient1)).add(point2.multiplyBy(coefficient2)).add(point3.multiplyBy(coefficient3));
        };
        BezierSegment.prototype.tangentAngleFromRatio = function (t, ratio) {
            var p1 = this.Joint1.getPosition(t);
            var p2 = this.ControlPoint1.getPosition(t);
            var p3 = this.ControlPoint2.getPosition(t);
            var p4 = this.Joint2.getPosition(t);
            var tx = 3 * ratio * ratio * (-p1.X + 3 * p2.X - 3 * p3.X + p4.X) + 6 * ratio * (p1.X - 2 * p2.X + p3.X) + 3 * (-p1.X + p2.X);
            var ty = 3 * ratio * ratio * (-p1.Y + 3 * p2.Y - 3 * p3.Y + p4.Y) + 6 * ratio * (p1.Y - 2 * p2.Y + p3.Y) + 3 * (-p1.Y + p2.Y);
            return Math.atan2(ty, tx);
        };
        BezierSegment.prototype.pointFromLength = function (t, length) {
            return this.pointFromRatio(t, length / this.length(t));
        };
        BezierSegment.prototype.length = function (t) {
            var array = new Array(4);
            array[0] = this.Joint1.getPosition(t);
            array[1] = this.ControlPoint1.getPosition(t);
            array[2] = this.ControlPoint2.getPosition(t);
            array[3] = this.Joint2.getPosition(t);
            if(!array[0].equals(this.LengthCache.Joint1) || !array[1].equals(this.LengthCache.ControlPoint0) || !array[2].equals(this.LengthCache.ControlPoint1) || !array[3].equals(this.LengthCache.Joint2)) {
                this.LengthCache.Joint1 = array[0];
                this.LengthCache.ControlPoint0 = array[1];
                this.LengthCache.ControlPoint1 = array[2];
                this.LengthCache.Joint2 = array[3];
                this.LengthCache.Length = this.arclen(array, 3);
            }
            return this.LengthCache.Length;
        };
        BezierSegment.prototype.getPerpendicularLine = function (t, point) {
            return null;
        };
        BezierSegment.prototype.getIntersectionPoint = function (t, otherLine) {
            return null;
        };
        BezierSegment.prototype.bezsplit = function (V, Left, Right) {
            var i;
            var j;

            var Vtemp = new Array(4);
            for(var i = 0; i < 4; i++) {
                Vtemp[i] = new Array(4);
            }
            for(var j = 0; j <= 3; j++) {
                Vtemp[0][j] = V[j];
            }
            for(i = 1; i <= 3; i++) {
                for(j = 0; j <= 3 - i; j++) {
                    Vtemp[i][j] = new Point.Point(0, 0);
                    Vtemp[i][j].X = 0.5 * Vtemp[i - 1][j].X + 0.5 * Vtemp[i - 1][j + 1].X;
                    Vtemp[i][j].y = 0.5 * Vtemp[i - 1][j].Y + 0.5 * Vtemp[i - 1][j + 1].Y;
                }
            }
            for(j = 0; j <= 3; j++) {
                Left[j] = Vtemp[j][0];
            }
            for(j = 0; j <= 3; j++) {
                Right[j] = Vtemp[3 - j][j];
            }
        };
        BezierSegment.prototype.V2DistanceBetween2Points = function (point1, point2) {
            var dx = point1.X - point2.X;
            var dy = point1.Y - point2.Y;
            return Math.sqrt(dx * dx + dy * dy);
        };
        BezierSegment.prototype.addifclose = function (V, length, error) {
            var left = new Array(4);
            var right = new Array(4);
            var len = 0;
            var chord;
            var index;
            for(index = 0; index <= 2; index++) {
                len = len + this.V2DistanceBetween2Points(V[index], V[index + 1]);
            }
            chord = this.V2DistanceBetween2Points(V[0], V[3]);
            if((len - chord) > error) {
                this.bezsplit(V, left, right);
                length = this.addifclose(left, length, error);
                length = this.addifclose(right, length, error);
                return length;
            }
            length = length + len;
            return length;
        };
        BezierSegment.prototype.arclen = function (V, error) {
            var length = 0;
            length = this.addifclose(V, length, error);
            return (length);
        };
        BezierSegment.prototype.getSubSegment = function (t, t0, t1) {
            var p1 = this.Joint1.getPosition(t);
            var p2 = this.ControlPoint1.getPosition(t);
            var p3 = this.ControlPoint2.getPosition(t);
            var p4 = this.Joint2.getPosition(t);
            var u0 = 1 - t0;
            var u1 = 1 - t1;
            var pp1 = p1.x(u0 * u0 * u0).add(p2.x(3 * t0 * u0 * u0)).add(p3.x(3 * t0 * t0 * u0)).add(p4.x(t0 * t0 * t0));
            var pp2 = p1.x(u0 * u0 * u1).add(p2.x(2 * t0 * u0 * u1 + u0 * u0 * t1)).add(p3.x(t0 * t0 * u1 + 2 * u0 * t0 * t1)).add(p4.x(t0 * t0 * t1));
            var pp3 = p1.x(u0 * u1 * u1).add(p2.x(t0 * u1 * u1 + 2 * u0 * t1 * u1)).add(p3.x(2 * t0 * t1 * u1 + u0 * t1 * t1)).add(p4.x(t0 * t1 * t1));
            var pp4 = p1.x(u1 * u1 * u1).add(p2.x(3 * t1 * u1 * u1)).add(p3.x(3 * t1 * t1 * u1)).add(p4.x(t1 * t1 * t1));
            return [
                pp1, 
                pp2, 
                pp3, 
                pp4
            ];
        };
        return BezierSegment;
    })(Segment.Segment);
    exports.BezierSegment = BezierSegment;    
})

