import SceneNode = module("scripts/scene/SceneNode");
import Segment = module("scripts/element/segment/Segment");

export class Joint {
    SceneNode: SceneNode.SceneNode;
    Segment1: Segment.Segment;
    Segment2: Segment.Segment;

    constructor (sceneNode: SceneNode.SceneNode) {
        this.SceneNode = sceneNode;
    }
    setSegments(segment1: Segment.Segment, segment2: Segment.Segment) {
        this.Segment1 = segment1;
        this.Segment2 = segment2;
    }
    getOtherSegment(segment: Segment.Segment) {
        return (segment == this.Segment1) ? this.Segment2 : this.Segment1;
    }
    createSegmentRenderer() {
        return null;
    }
    getPosition(t: number) {
        return this.SceneNode.getPosition(t);
    }
}