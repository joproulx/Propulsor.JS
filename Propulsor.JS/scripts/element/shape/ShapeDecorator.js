var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "element/shape/Shape", "element/Movable"], function(require, exports, __Shape__, __Movable__) {
    var Shape = __Shape__;

    var Movable = __Movable__;

    
    var ShapeDecorator = (function (_super) {
        __extends(ShapeDecorator, _super);
        function ShapeDecorator(shape) {
            this._shape = shape;
                _super.call(this, shape);
        }
        ShapeDecorator.prototype.render = function (t, context) {
            this._shape.render(t, context);
        };
        return ShapeDecorator;
    })(Movable.MovableWrapper);
    exports.ShapeDecorator = ShapeDecorator;    
})
