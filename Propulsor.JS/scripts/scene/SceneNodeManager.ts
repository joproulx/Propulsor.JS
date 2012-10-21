import SceneNode = module("scene/SceneNode");

export class SceneNodeManager {
    SceneNodes: SceneNode.SceneNode[];
    constructor () {
        this.SceneNodes = new SceneNode.SceneNode[];
    }
    addSceneNode(sceneNode: SceneNode.SceneNode) {
        this.SceneNodes.push(sceneNode);
    }
}