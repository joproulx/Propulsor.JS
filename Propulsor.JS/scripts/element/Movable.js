define(["require", "exports", "sceneGraph/SceneNode"], function(require, exports, __SceneNode__) {
    var SceneNode = __SceneNode__;

    
    
    var Movable = (function () {
        function Movable(sceneNode) {
            this.SceneNode = sceneNode;
        }
        Movable.prototype.getPosition = function (t) {
            return this.SceneNode.getPosition(t);
        };
        Movable.prototype.setAbsolutePosition = function (t, point) {
            return this.SceneNode.setAbsolutePosition(t, point);
        };
        Movable.prototype.setRelativePosition = function (t, point) {
            return this.SceneNode.setRelativePosition(t, point);
        };
        Movable.prototype.rotate = function (t, radian) {
            this.SceneNode.rotate(t, radian);
        };
        Movable.prototype.followPathPosition = function (t, path, startRatio, endRatio) {
            this.SceneNode.followPathPosition(t, path, startRatio, endRatio);
        };
        return Movable;
    })();
    exports.Movable = Movable;    
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
        MovableWrapper.prototype.followPathPosition = function (t, path, startRatio, endRatio) {
            this._movable.followPathPosition(t, path, startRatio, endRatio);
        };
        return MovableWrapper;
    })();
    exports.MovableWrapper = MovableWrapper;    
})
