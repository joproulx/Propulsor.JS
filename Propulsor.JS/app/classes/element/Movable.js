define(["require", "exports"], function(require, exports) {
    
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
        return Movable;
    })();
    return Movable;
});
//# sourceMappingURL=Movable.js.map
