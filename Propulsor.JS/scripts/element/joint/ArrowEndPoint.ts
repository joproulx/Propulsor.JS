//export import EndPoint = module("EndPoint");
//export import SceneNode = module("sceneGraph/SceneNode");
//export import ArrowSegmentRenderer = module("element/renderer/ArrowSegmentRenderer");

//export class ArrowEndPoint extends EndPoint.EndPoint {
//    ArrowLength: number;
//    ArrowWidth: number;
    
//    constructor (sceneNode: SceneNode.SceneNode, arrowLength: number, arrowWidth: number) {
//        super(sceneNode);
//        this.ArrowLength = arrowLength;
//        this.ArrowWidth = arrowWidth;
//    }
//    createSegmentRenderer() {
//        return new ArrowSegmentRenderer.ArrowSegmentRenderer(this);
//    }
//}