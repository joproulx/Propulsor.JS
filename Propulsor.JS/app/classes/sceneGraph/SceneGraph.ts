import SceneNode = require("classes/sceneGraph/SceneNode");
import Path = require("classes/element/path/Path");

export = SceneGraph;
class SceneGraph {
    SceneNodes: SceneNode[];
    constructor () {
        this.SceneNodes = [];
    }
    addSceneNode(sceneNode: SceneNode) {
        this.SceneNodes.push(sceneNode);
    }
}