export import Point = module("common/Point");
export import SceneNode = module("sceneGraph/SceneNode");
export import BezierSegmentRenderer = module("element/renderer/BezierSegmentRenderer");
export import Segment = module("element/segment/Segment");
export import Joint = module("element/joint/Joint");

export class LengthCache {
    Length: number;
    Joint1: Joint.Joint;
    Joint2: Joint.Joint;
    ControlPoint0: SceneNode.SceneNode;
    ControlPoint1: SceneNode.SceneNode;
    constructor () {
        this.Length = 0;
        this.Joint1 = null;
        this.Joint2 = null;
        this.ControlPoint0 = null;
        this.ControlPoint1 = null;
    }
}

export class BezierSegment extends Segment.Segment{
    LengthCache: LengthCache;
    ControlPoint1: SceneNode.SceneNode;
    ControlPoint2: SceneNode.SceneNode;
    constructor () {
        this.LengthCache = new LengthCache();
        super();
    }
    setControlPoints(sceneNode1: SceneNode.SceneNode, sceneNode2: SceneNode.SceneNode) {
        this.ControlPoint1 = sceneNode1;
        this.ControlPoint2 = sceneNode2;
    }
    createSegmentRenderer() {
        return new BezierSegmentRenderer.BezierSegmentRenderer(this);
    }
    pointFromRatio(t: number, ratio: number) {
        var coefficient0 = Math.pow((1 - ratio), 3);
        var coefficient1 = 3 * ratio * Math.pow((1 - ratio), 2);
        var coefficient2 = 3 * ratio * ratio * (1 - ratio);
        var coefficient3 = ratio * ratio * ratio;

        var point0 = this.Joint1.getPosition(t);
        var point1 = this.ControlPoint1.getPosition(t);
        var point2 = this.ControlPoint2.getPosition(t);
        var point3 = this.Joint2.getPosition(t);

        return point0.multiplyBy(coefficient0).add(point1.multiplyBy(coefficient1)).add(point2.multiplyBy(coefficient2)).add(point3.multiplyBy(coefficient3));
    }
    tangentAngleFromRatio(t: number, ratio: number) {
        var p1 = this.Joint1.getPosition(t);
        var p2 = this.ControlPoint1.getPosition(t);
        var p3 = this.ControlPoint2.getPosition(t);
        var p4 = this.Joint2.getPosition(t);

        var tx = 3 * ratio * ratio * (-p1.X + 3 * p2.X - 3 * p3.X + p4.X) + 6 * ratio * (p1.X - 2 * p2.X + p3.X) + 3 * (-p1.X + p2.X);
        var ty = 3 * ratio * ratio * (-p1.Y + 3 * p2.Y - 3 * p3.Y + p4.Y) + 6 * ratio * (p1.Y - 2 * p2.Y + p3.Y) + 3 * (-p1.Y + p2.Y);

        return Math.atan2(ty, tx);
    }
    pointFromLength(t: number, length: number) {
        return this.pointFromRatio(t, length / this.length(t));
    }
    length(t: number) {
        var array = new Array(4);

        array[0] = this.Joint1.getPosition(t);
        array[1] = this.ControlPoint1.getPosition(t);
        array[2] = this.ControlPoint2.getPosition(t);
        array[3] = this.Joint2.getPosition(t);

        if (!array[0].equals(this.LengthCache.Joint1) ||
            !array[1].equals(this.LengthCache.ControlPoint0) ||
            !array[2].equals(this.LengthCache.ControlPoint1) ||
            !array[3].equals(this.LengthCache.Joint2)) {

            this.LengthCache.Joint1 = array[0];
            this.LengthCache.ControlPoint0 = array[1];
            this.LengthCache.ControlPoint1 = array[2];
            this.LengthCache.Joint2 = array[3];

            this.LengthCache.Length = this.arclen(array, 3);
        }
        return this.LengthCache.Length;
    }
    getPerpendicularLine(t: number, point: Point.Point) {
        return null;  //this.Line.getPerpendicularLine(t, point);
    }
    getIntersectionPoint(t: number, otherLine) {
        return null;  //this.Line.getIntersectionPoint(t, otherLine);
    }
    private bezsplit(V, Left, Right) {
        var i, j;
        /* Index variables  */
        var Vtemp = new Array(4)
        for (var i = 0; i < 4; i++) {
            Vtemp[i] = new Array(4);
        }

        for (var j = 0; j <= 3; j++)
            Vtemp[0][j] = V[j];

        /* Triangle computation */
        for (i = 1; i <= 3; i++) {
            for (j = 0; j <= 3 - i; j++) {
                Vtemp[i][j] = new Point.Point(0, 0);
                Vtemp[i][j].X = 0.5 * Vtemp[i - 1][j].X + 0.5 * Vtemp[i - 1][j + 1].X;
                Vtemp[i][j].y = 0.5 * Vtemp[i - 1][j].Y + 0.5 * Vtemp[i - 1][j + 1].Y;
            }
        }

        for (j = 0; j <= 3; j++)
            Left[j] = Vtemp[j][0];

        for (j = 0; j <= 3; j++)
            Right[j] = Vtemp[3 - j][j];
    }
    private V2DistanceBetween2Points(point1, point2) {
        var dx = point1.X - point2.X;
        var dy = point1.Y - point2.Y;

        return Math.sqrt(dx * dx + dy * dy);
    }
    private addifclose(V, length, error) {
        var left = new Array(4)
        var right = new Array(4);
        /* bez poly splits */

        var len = 0.0;
        /* arc length */
        var chord;
        /* chord length */

        var index;
        /* misc counter */

        for (index = 0; index <= 2; index++)
            len = len + this.V2DistanceBetween2Points(V[index], V[index + 1]);

        chord = this.V2DistanceBetween2Points(V[0], V[3]);

        if ((len - chord) > error) {
            this.bezsplit(V, left, right);
            /* split in two */
            length = this.addifclose(left, length, error);
            /* try left side */
            length = this.addifclose(right, length, error);
            /* try right side */
            return length;
        }

        length = length + len;

        return length;
    }
    //  Taken from: http://steve.hollasch.net/cgindex/curves/cbezarclen.html
    private arclen(V, error) {
        var length = 0;
        /* length of curve */

        length = this.addifclose(V, length, error);
        /* kick off recursion */

        return (length);
        /* that's it! */
    }
    getSubSegment(t: number, t0: number, t1: number) {
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

        return [pp1, pp2, pp3, pp4];
    }



    //Section of bezier curve:

    //
    //u0 = 1.0 - t0
    //u1 = 1.0 - t1
    //
    //xa =  x1*u0*u0 + bx1*2*t0*u0 + bx2*t0*t0
    //xb =  x1*u1*u1 + bx1*2*t1*u1 + bx2*t1*t1
    //xc = bx1*u0*u0 + bx2*2*t0*u0 +  x2*t0*t0
    //xd = bx1*u1*u1 + bx2*2*t1*u1 +  x2*t1*t1
    //
    //ya =  y1*u0*u0 + by1*2*t0*u0 + by2*t0*t0
    //yb =  y1*u1*u1 + by1*2*t1*u1 + by2*t1*t1
    //yc = by1*u0*u0 + by2*2*t0*u0 +  y2*t0*t0
    //yd = by1*u1*u1 + by2*2*t1*u1 +  y2*t1*t1

    //Then just draw the Bézier curve formed by (xa,ya), (xb,yb), (xc,yc) and (xd,yd).




    //        t = 0.5;
    //
    //        x1 = points[0].X;
    //        y1 = points[0].Y
    //        x2 = point1.get(0).X;
    //        y2 = point1.get(0).Y
    //        x3 = point2.get(0).X;
    //        y3 = point2.get(0).Y
    //
    //
    //        x4 = points[1].X;
    //        y4 = points[1].Y
    //
    //        x12 = (x2-x1)*t+x1
    //        y12 = (y2-y1)*t+y1
    //
    //        x23 = (x3-x2)*t+x2
    //        y23 = (y3-y2)*t+y2
    //
    //        x34 = (x4-x3)*t+x3
    //        y34 = (y4-y3)*t+y3
    //
    //        x123 = (x23-x12)*t+x12
    //        y123 = (y23-y12)*t+y12
    //
    //        x234 = (x34-x23)*t+x23
    //        y234 = (y34-y23)*t+y23
    //
    //        x1234 = (x234-x123)*t+x123
    //        y1234 = (y234-y123)*t+y123
    //
    //         ((x34-x23)*t+x23)*t
    //
    //
    //        points2 = [new Point(x1, y1), new Point(x1234, y1234)];
    //        var bezier2 = new PolySegmentShape(0, points2, false, false);
    //
    //        point1 = new TimedValue(function(){ return new PointTransition();
}