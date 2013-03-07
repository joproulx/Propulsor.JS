export import SceneNode = module("sceneGraph/SceneNode");

export class SceneGraph {
    SceneNodes: SceneNode.SceneNode[];
    constructor () {
        this.SceneNodes = new SceneNode.SceneNode[];
    }
    addSceneNode(sceneNode: SceneNode.SceneNode) {
        this.SceneNodes.push(sceneNode);
    }
}