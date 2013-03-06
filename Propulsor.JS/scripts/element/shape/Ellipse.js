var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "element/shape/Shape", "element/shape/PolySegmentShape"], function(require, exports, __Shape__, __PolySegmentShape__) {
    var Shape = __Shape__;

    var PolySegmentShape = __PolySegmentShape__;

    var EllipseShape = (function (_super) {
        __extends(EllipseShape, _super);
        function EllipseShape(t, width, height) {
            var path = new Shape.JSonPath();
            var radiusX = width / 2;
            var radiusY = height / 2;
            path.IsClosedPath = true;
            path.Origin = {
                X: 0,
                Y: 0
            };
            path.Items = [
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
                _super.call(this, t, path);
        }
        EllipseShape.Const = 0.5522847498;
        return EllipseShape;
    })(PolySegmentShape.PolySegmentShape);
    exports.EllipseShape = EllipseShape;    
})
