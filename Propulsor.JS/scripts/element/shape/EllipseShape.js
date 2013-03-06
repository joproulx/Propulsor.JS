var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "element/shape/Shape", "element/shape/ShapeDecorator", "element/path/JsonPathBuilder", "common/Point"], function(require, exports, __Shape__, __ShapeDecorator__, __JsonPathBuilder__, __Point__) {
    var Shape = __Shape__;

    var ShapeDecorator = __ShapeDecorator__;

    var JsonPathBuilder = __JsonPathBuilder__;

    
    var Point = __Point__;

    
    var EllipseShape = (function (_super) {
        __extends(EllipseShape, _super);
        function EllipseShape(t, width, height) {
            var pathDefinition = new JsonPathBuilder.JsonPathDefinition();
            var radiusX = width / 2;
            var radiusY = height / 2;
            pathDefinition.IsClosedPath = true;
            pathDefinition.Origin = {
                X: 0,
                Y: 0
            };
            pathDefinition.Items = [
                {
                    X: 0,
                    Y: -radiusY
                }, 
                {
                    SegmentType: "bezier",
                    ControlPoint1: {
                        X: radiusX * EllipseShape.Const,
                        Y: -radiusY
                    },
                    ControlPoint2: {
                        X: radiusX,
                        Y: -radiusY * EllipseShape.Const
                    }
                }, 
                {
                    X: radiusX,
                    Y: 0
                }, 
                {
                    SegmentType: "bezier",
                    ControlPoint1: {
                        X: radiusX,
                        Y: radiusY * EllipseShape.Const
                    },
                    ControlPoint2: {
                        X: radiusX * EllipseShape.Const,
                        Y: radiusY
                    }
                }, 
                {
                    X: 0,
                    Y: radiusY
                }, 
                {
                    SegmentType: "bezier",
                    ControlPoint1: {
                        X: -radiusX * EllipseShape.Const,
                        Y: radiusY
                    },
                    ControlPoint2: {
                        X: -radiusX,
                        Y: radiusY * EllipseShape.Const
                    }
                }, 
                {
                    X: -radiusX,
                    Y: 0
                }, 
                {
                    SegmentType: "bezier",
                    ControlPoint1: {
                        X: -radiusX,
                        Y: -radiusY * EllipseShape.Const
                    },
                    ControlPoint2: {
                        X: -radiusX * EllipseShape.Const,
                        Y: -radiusY
                    }
                }, 
                {
                    X: 0,
                    Y: -radiusY
                }
            ];
            var builder = new JsonPathBuilder.JsonPathBuilder();
            this._path = builder.load(t, pathDefinition);
            var shape = new Shape.Shape(this._path);
                _super.call(this, shape);
        }
        EllipseShape.Const = 0.5522847498;
        EllipseShape.prototype.setSize = function (t, width, height) {
            var radiusX = width / 2;
            var radiusY = height / 2;
            this._path.Joints[0].SceneNode.setRelativePosition(t, new Point.Point(0, -radiusY));
            (this._path.Segments[0]).ControlPoint1.setRelativePosition(t, new Point.Point(radiusX * EllipseShape.Const, -radiusY));
            (this._path.Segments[0]).ControlPoint2.setRelativePosition(t, new Point.Point(radiusX, -radiusY * EllipseShape.Const));
            this._path.Joints[1].SceneNode.setRelativePosition(t, new Point.Point(radiusX, 0));
            (this._path.Segments[1]).ControlPoint1.setRelativePosition(t, new Point.Point(radiusX, radiusY * EllipseShape.Const));
            (this._path.Segments[1]).ControlPoint2.setRelativePosition(t, new Point.Point(radiusX * EllipseShape.Const, radiusY));
            this._path.Joints[2].SceneNode.setRelativePosition(t, new Point.Point(0, radiusY));
            (this._path.Segments[2]).ControlPoint1.setRelativePosition(t, new Point.Point(-radiusX * EllipseShape.Const, radiusY));
            (this._path.Segments[2]).ControlPoint2.setRelativePosition(t, new Point.Point(-radiusX, radiusY * EllipseShape.Const));
            this._path.Joints[3].SceneNode.setRelativePosition(t, new Point.Point(-radiusX, 0));
            (this._path.Segments[3]).ControlPoint1.setRelativePosition(t, new Point.Point(-radiusX, -radiusY * EllipseShape.Const));
            (this._path.Segments[3]).ControlPoint2.setRelativePosition(t, new Point.Point(-radiusX * EllipseShape.Const, -radiusY));
            this._path.Joints[4].SceneNode.setRelativePosition(t, new Point.Point(0, -radiusY));
        };
        return EllipseShape;
    })(ShapeDecorator.ShapeDecorator);
    exports.EllipseShape = EllipseShape;    
})
