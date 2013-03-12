define(["require", "exports"], function(require, exports) {
    var CanvasContext = (function () {
        function CanvasContext(context) {
            this._context = context;
        }
        CanvasContext.prototype.save = function () {
        };
        CanvasContext.prototype.beginPath = function () {
        };
        CanvasContext.prototype.endPath = function () {
        };
        CanvasContext.prototype.setFillStyle = function () {
        };
        CanvasContext.prototype.setStrokeStyle = function () {
        };
        CanvasContext.prototype.stroke = function () {
        };
        CanvasContext.prototype.restore = function () {
        };
        CanvasContext.prototype.fill = function () {
        };
        CanvasContext.prototype.closePath = function () {
        };
        return CanvasContext;
    })();
    exports.CanvasContext = CanvasContext;    
})
