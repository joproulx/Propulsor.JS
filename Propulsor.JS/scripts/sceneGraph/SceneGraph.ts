import SceneNode = module("sceneGraph/SceneNode");
import Path = module("element/path/Path");

export class SceneGraph {
    SceneNodes: SceneNode.SceneNode[];
    constructor () {
        this.SceneNodes = [];
    }
    addSceneNode(sceneNode: SceneNode.SceneNode) {
        this.SceneNodes.push(sceneNode);
    }
}