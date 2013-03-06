var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "element/shape/EllipseShape"], function(require, exports, __EllipseShape__) {
    var EllipseShape = __EllipseShape__;

    var CircleShape = (function (_super) {
        __extends(CircleShape, _super);
        function CircleShape(t, radius) {
                _super.call(this, t, radius * 2, radius * 2);
        }
        CircleShape.prototype.setRadius = function (t, radius) {
            this.setSize(t, radius * 2, radius * 2);
        };
        return CircleShape;
    })(EllipseShape.EllipseShape);
    exports.CircleShape = CircleShape;    
})
