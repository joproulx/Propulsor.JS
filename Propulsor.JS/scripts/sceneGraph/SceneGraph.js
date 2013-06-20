define(["require", "exports"], function(require, exports) {
    
    
    var SceneGraph = (function () {
        function SceneGraph() {
            this.SceneNodes = [];
        }
        SceneGraph.prototype.addSceneNode = function (sceneNode) {
            this.SceneNodes.push(sceneNode);
        };
        return SceneGraph;
    })();
    exports.SceneGraph = SceneGraph;    
})
