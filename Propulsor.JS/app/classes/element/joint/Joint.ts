import SceneNode = require("classes/sceneGraph/SceneNode");
import Segment = require("classes/element/segment/Segment");
import Movable = require("classes/element/Movable");
import SegmentRenderer = require("classes/element/renderer/SegmentRenderer");

export = Joint;
class Joint extends Movable {
    SceneNode: SceneNode;
    Segment1: Segment;
    Segment2: Segment;

    constructor (sceneNode: SceneNode) {
        super(sceneNode);
    }
    setSegments(segment1: Segment, segment2: Segment) {
        this.Segment1 = segment1;
        this.Segment2 = segment2;
    }

    setSegment1(segment: Segment) {
        this.Segment1 = segment;
    }
    setSegment2(segment: Segment) {
        this.Segment2 = segment;
    }
    getOtherSegment(segment: Segment): Segment {
        return (segment == this.Segment1) ? this.Segment2 : this.Segment1;
    }
    createSegmentRenderer(): SegmentRenderer {
        return null;
    }
}