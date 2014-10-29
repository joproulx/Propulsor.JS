define(["require", "exports"], function(require, exports) {
    
    var Movable = (function () {
        function Movable(sceneNode) {
            this.SceneNode = sceneNode;
        }
        Movable.prototype.getPosition = function (t) {
            return this.SceneNode.getPosition(t);
        };
        Movable.prototype.setAbsolutePosition = function (point, config) {
            return this.SceneNode.setAbsolutePosition(point, config);
        };
        Movable.prototype.setRelativePosition = function (point, config) {
            return this.SceneNode.setRelativePosition(point, config);
        };
        Movable.prototype.rotate = function (radian, config) {
            this.SceneNode.rotate(radian, config);
        };
        return Movable;
    })();
    return Movable;
});
//# sourceMappingURL=Movable.js.map
