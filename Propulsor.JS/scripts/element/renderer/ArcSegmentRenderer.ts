//export import ArcSegment = module("element/segment/ArcSegment");
//export import SegmentRenderer = module("element/renderer/SegmentRenderer");

//declare var Vector: any;

//export class ArcSegmentRenderer extends SegmentRenderer.SegmentRenderer {
//    Segment: ArcSegment.ArcSegment;

//    constructor (arcSegment: ArcSegment.ArcSegment, isCorner: bool) {
//        super(arcSegment, isCorner);
//    }
//    render(t: number, context: Object) {
//        var linePerpendicular1 = this.Segment.Segment1.getPerpendicularLine(t, this.getPoint1(t));

//        var linePerpendicular2 = this.Segment.Segment2.getPerpendicularLine(t, this.getPoint2(t));

//        var pointIntersect = linePerpendicular1.getIntersectionPoint(t, linePerpendicular2);

//        var radius = pointIntersect.distanceFrom(this.getPoint1(t));

//        var adjustedY1 = (this.getPoint1(t).Y - pointIntersect.Y);
//        var adjustedX1 = (this.getPoint1(t).X - pointIntersect.X);

//        var adjustedY2 = (this.getPoint2(t).Y - pointIntersect.Y);
//        var adjustedX2 = (this.getPoint2(t).X - pointIntersect.X);

//        var angle1 = Math.atan2(adjustedY1, adjustedX1);
//        var angle2 = Math.atan2(adjustedY2, adjustedX2);

//        var V1 = Vector.create([adjustedX1, -adjustedY1, 0]);
//        var V2 = Vector.create([adjustedX2, -adjustedY2, 0]);

//        var angle = V1.cross(V2);

//        context.arc(pointIntersect.X, pointIntersect.Y, radius, angle1, angle2, (angle.elements[2] > 0));
//    }
//    getPoint1(t) {
//        if (this.IsCorner) {
//            return this.Segment.Segment1.pointFromLength(t, this.Segment.Segment1.length(t) - this.Segment.CornerLength);
//        }
//        else {
//            if (this.SegmentRenderer1 != null && this.SegmentRenderer1.IsCorner) {
//                return this.SegmentRenderer1.getPoint2(t);
//            }
//            return this.LineSegment.Joint1.getPosition(t);
//        }
//    }
//    getPoint2(t) {
//        if (this.IsCorner) {
//            return this.Segment.Segment2.pointFromLength(t, this.Segment.CornerLength);
//        }
//        else {
//            if (this.SegmentRenderer2 != null && this.SegmentRenderer2.IsCorner) {
//                return this.SegmentRenderer2.getPoint1(t);
//            }
//            return this.LineSegment.Joint2.getPosition(t);
//        }
//    }
//}