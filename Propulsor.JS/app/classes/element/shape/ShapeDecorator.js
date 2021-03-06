var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "classes/element/MovableWrapper"], function(require, exports, MovableWrapper) {
    
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
    })(MovableWrapper);
    return ShapeDecorator;
});
//# sourceMappingURL=ShapeDecorator.js.map
