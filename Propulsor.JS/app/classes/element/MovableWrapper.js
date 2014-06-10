define(["require", "exports"], function(require, exports) {
    
    var MovableWrapper = (function () {
        function MovableWrapper(movable) {
            this._movable = movable;
        }
        MovableWrapper.prototype.getPosition = function (t) {
            return this._movable.getPosition(t);
        };
        MovableWrapper.prototype.setAbsolutePosition = function (t, point) {
            return this._movable.setAbsolutePosition(t, point);
        };
        MovableWrapper.prototype.setRelativePosition = function (t, point) {
            return this._movable.setRelativePosition(t, point);
        };
        MovableWrapper.prototype.rotate = function (t, radian) {
            this._movable.rotate(t, radian);
        };
        return MovableWrapper;
    })();
    return MovableWrapper;
});
//# sourceMappingURL=MovableWrapper.js.map
