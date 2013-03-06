export import SceneNode = module("scene/SceneNode");
export import Segment = module("element/segment/Segment");
export import Movable = module("element/Movable");


export class Joint extends Movable.Movable {
    SceneNode: SceneNode.SceneNode;
    Segment1: Segment.Segment;
    Segment2: Segment.Segment;

    constructor (sceneNode: SceneNode.SceneNode) {
        super(sceneNode);
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
}