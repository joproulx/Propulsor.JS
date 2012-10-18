import Joint = module("scripts/element/joint/Joint");
import SceneNode = module("scripts/scene/SceneNode");

export class EndPoint extends Joint.Joint {
    constructor (sceneNode: SceneNode.SceneNode) {
        super(sceneNode);
    }
    createSegmentRenderer() {
        return null;
    }
    isStartEndPoint() {
        return this.Segment1.Joint1 === this;
    }
    setSegment(segment) {
        return this.setSegments(segment, segment);
    }
}