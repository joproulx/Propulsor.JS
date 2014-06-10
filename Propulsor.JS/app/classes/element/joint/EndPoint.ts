import Joint = require("classes/element/joint/Joint");
import SceneNode = require("classes/sceneGraph/SceneNode");

export = EndPoint;
class EndPoint extends Joint {
    constructor (sceneNode: SceneNode) {
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