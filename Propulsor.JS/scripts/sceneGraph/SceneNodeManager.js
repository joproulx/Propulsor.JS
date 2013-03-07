define(["require", "exports"], function(require, exports) {
    
    var SceneNodeManager = (function () {
        function SceneNodeManager() {
            this.SceneNodes = new ();
        }
        SceneNodeManager.prototype.addSceneNode = function (sceneNode) {
            this.SceneNodes.push(sceneNode);
        };
        return SceneNodeManager;
    })();
    exports.SceneNodeManager = SceneNodeManager;    
})
