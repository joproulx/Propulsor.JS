export import Shape = module("element/shape/Shape");
export import ShapeDecorator = module("element/shape/ShapeDecorator");
export import JsonPathBuilder = module("element/path/JsonPathBuilder");
export import Path = module("element/path/Path");
export import Point = module("common/Point");
export import BezierSegment = module("element/segment/BezierSegment");

export class EllipseShape extends ShapeDecorator.ShapeDecorator{
    static Const = 0.5522847498;
    _path: Path.Path;

    constructor (t: number, width: number, height: number) {
        var pathDefinition = new JsonPathBuilder.JsonPathDefinition();
        var radiusX = width / 2;
        var radiusY = height / 2;
        pathDefinition.IsClosedPath= true;
        pathDefinition.Origin = { X: 0, Y: 0 };
        pathDefinition.Items = [{ X: 0, Y: -radiusY },
                { SegmentType: "bezier", ControlPoint1: { X: radiusX *  EllipseShape.Const, Y: -radiusY  }, ControlPoint2: { X: radiusX, Y: - radiusY * EllipseShape.Const  } },
                { X: radiusX, Y: 0 },
                { SegmentType: "bezier", ControlPoint1: { X: radiusX , Y: radiusY *  EllipseShape.Const  }, ControlPoint2: { X:  radiusX * EllipseShape.Const , Y: radiusY } },
                { X: 0, Y: radiusY },
                { SegmentType: "bezier", ControlPoint1: { X: -radiusX *  EllipseShape.Const, Y: radiusY  }, ControlPoint2: { X: - radiusX, Y: radiusY * EllipseShape.Const } },
                { X: -radiusX, Y: 0 },
                { SegmentType: "bezier", ControlPoint1: { X: -radiusX, Y: -radiusY *  EllipseShape.Const  }, ControlPoint2: { X: - radiusX *  EllipseShape.Const, Y: - radiusY } },
                { X: 0, Y: -radiusY }];

        var builder = new JsonPathBuilder.JsonPathBuilder();
        this._path = <Path.Path>builder.load(t, pathDefinition);
        var shape = new Shape.Shape(this._path);
        
        super(shape);
    }
    setSize(t: number, width: number, height: number) { 
        var radiusX = width / 2;
        var radiusY = height / 2;
        this._path.Joints[0].SceneNode.setRelativePosition(t, new Point.Point(0, -radiusY));
        (<BezierSegment.BezierSegment>this._path.Segments[0]).ControlPoint1.setRelativePosition(t, new Point.Point(radiusX *  EllipseShape.Const, -radiusY));
        (<BezierSegment.BezierSegment>this._path.Segments[0]).ControlPoint2.setRelativePosition(t, new Point.Point(radiusX, -radiusY *  EllipseShape.Const));

        this._path.Joints[1].SceneNode.setRelativePosition(t, new Point.Point(radiusX, 0));
        (<BezierSegment.BezierSegment>this._path.Segments[1]).ControlPoint1.setRelativePosition(t, new Point.Point(radiusX, radiusY*  EllipseShape.Const));
        (<BezierSegment.BezierSegment>this._path.Segments[1]).ControlPoint2.setRelativePosition(t, new Point.Point(radiusX*  EllipseShape.Const, radiusY));

        this._path.Joints[2].SceneNode.setRelativePosition(t, new Point.Point(0, radiusY));
        (<BezierSegment.BezierSegment>this._path.Segments[2]).ControlPoint1.setRelativePosition(t, new Point.Point(-radiusX*  EllipseShape.Const, radiusY));
        (<BezierSegment.BezierSegment>this._path.Segments[2]).ControlPoint2.setRelativePosition(t, new Point.Point(-radiusX, radiusY*  EllipseShape.Const));

        this._path.Joints[3].SceneNode.setRelativePosition(t, new Point.Point(-radiusX, 0));
        (<BezierSegment.BezierSegment>this._path.Segments[3]).ControlPoint1.setRelativePosition(t, new Point.Point(-radiusX, -radiusY*  EllipseShape.Const));
        (<BezierSegment.BezierSegment>this._path.Segments[3]).ControlPoint2.setRelativePosition(t, new Point.Point(-radiusX*  EllipseShape.Const, -radiusY));

        this._path.Joints[4].SceneNode.setRelativePosition(t, new Point.Point(0, -radiusY));
    }
}
