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
        Object.defineProperty(ShapeDecorator.prototype, "Id", {
            get: function () {
                return this._shape.Id;
            },
            set: function (value) {
                this._shape.Id = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShapeDecorator.prototype, "Path", {
            get: function () {
                return this._shape.Path;
            },
            set: function (value) {
                this._shape.Path = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShapeDecorator.prototype, "Renderer", {
            get: function () {
                return this._shape.Renderer;
            },
            set: function (value) {
                this._shape.Renderer = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShapeDecorator.prototype, "Stroke", {
            get: function () {
                return this._shape.Stroke;
            },
            set: function (value) {
                this._shape.Stroke = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShapeDecorator.prototype, "Fill", {
            get: function () {
                return this._shape.Fill;
            },
            set: function (value) {
                this._shape.Fill = value;
            },
            enumerable: true,
            configurable: true
        });
        return ShapeDecorator;
    })(Movable.MovableWrapper);
    exports.ShapeDecorator = ShapeDecorator;    
})
