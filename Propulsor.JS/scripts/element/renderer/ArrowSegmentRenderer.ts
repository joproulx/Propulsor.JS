//import SegmentRenderer = module("element/renderer/SegmentRenderer");
//import EndPoint = module("element/joint/EndPoint");

//export class ArrowSegmentRenderer extends SegmentRenderer.SegmentRenderer {


//    constructor (arrowEndPoint: EndPoint.EndPoint) {
//        super(arrowEndPoint, true);
//        this.IsIndependantShape = true;
//        this.ArrowEndPoint = arrowEndPoint;
//    }
//    render(t, context) {
//        var linePerpendicular1 = this.ArrowEndPoint.Segment1.getPerpendicularLine(t, this.getPoint1(t));
//        var points = [];
//        points.push(this.ArrowEndPoint.getPosition(t));
//        points = points.concat(linePerpendicular1.getPoints(t, this.getPoint1(t), this.ArrowEndPoint.ArrowWidth));
//        var point = this.getPoint1(t);

//        context.stroke();
//        context.save();
//        context.lineWidth = 1;
//        context.beginPath();
//        context.moveTo(point.X, point.Y);
//        context.lineTo(points[1].X, points[1].Y);
//        context.lineTo(points[0].X, points[0].Y);
//        context.lineTo(points[2].X, points[2].Y);
//        context.lineTo(point.X, point.Y);
//        context.fill();
//        context.stroke();
//        context.restore();
//        context.beginPath();
//        context.moveTo(point.X, point.Y);
//    }
//    getPoint1(t) {
//        if (this.IsCorner) {
//            return this.ArrowEndPoint.Segment1.pointFromLength(t, this.ArrowEndPoint.isStartEndPoint() ? this.ArrowEndPoint.ArrowLength :
//                this.ArrowEndPoint.Segment1.length(t) - this.ArrowEndPoint.ArrowLength);
//        }
//        return null;
//    }
//    getPoint2(t) {
//        if (this.IsCorner) {
//            return this.getPoint1(t);
//        }
//        return null;
//    }
//}