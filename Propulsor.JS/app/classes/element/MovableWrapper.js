define(["require", "exports"], function(require, exports) {
    
    var MovableWrapper = (function () {
        function MovableWrapper(movable) {
            this._movable = movable;
        }
        MovableWrapper.prototype.getPosition = function (t) {
            return this._movable.getPosition(t);
        };
        MovableWrapper.prototype.setAbsolutePosition = function (point, config) {
            return this._movable.setAbsolutePosition(point, config);
        };
        MovableWrapper.prototype.setRelativePosition = function (point, config) {
            return this._movable.setRelativePosition(point, config);
        };
        MovableWrapper.prototype.rotate = function (radian, config) {
            this._movable.rotate(radian, config);
        };
        return MovableWrapper;
    })();
    return MovableWrapper;
});
//# sourceMappingURL=MovableWrapper.js.map
