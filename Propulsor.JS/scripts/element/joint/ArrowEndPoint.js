var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var EndPoint = require("./EndPoint")


var ArrowEndPoint = (function (_super) {
    __extends(ArrowEndPoint, _super);
    function ArrowEndPoint(sceneNode, arrowLength, arrowWidth) {
        _super.call(this, sceneNode);
        this.ArrowLength = arrowLength;
        this.ArrowWidth = arrowWidth;
    }
    ArrowEndPoint.prototype.createSegmentRenderer = function () {
        return new ArrowSegmentRenderer.ArrowSegmentRenderer(this);
    };
    return ArrowEndPoint;
})(EndPoint.EndPoint);
exports.ArrowEndPoint = ArrowEndPoint;

