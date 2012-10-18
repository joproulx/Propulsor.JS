var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports", "scripts/element/shape/Shape", "scripts/element/shape/PolySegmentShape"], function(require, exports, __Shape__, __PolySegmentShape__) {
    var Shape = __Shape__;

    var PolySegmentShape = __PolySegmentShape__;

    var ArrowShape = (function (_super) {
        __extends(ArrowShape, _super);
        function ArrowShape(t) {
            var path = new Shape.JSonPath();
            path.IsClosedPath = true;
            path.Origin = {
                X: 0,
                Y: 25
            };
            path.Items = [
                {
                    X: 0,
                    Y: -25
                }, 
                {
                    SegmentType: "line"
                }, 
                {
                    X: 50,
                    Y: 0
                }, 
                {
                    SegmentType: "line"
                }, 
                {
                    X: 0,
                    Y: 25
                }, 
                {
                    SegmentType: "line"
                }
            ];
                _super.call(this, t, path);
        }
        return ArrowShape;
    })(PolySegmentShape.PolySegmentShape);
    exports.ArrowShape = ArrowShape;    
})

