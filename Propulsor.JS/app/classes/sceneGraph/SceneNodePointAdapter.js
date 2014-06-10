var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "classes/common/timedValue/TimedValue"], function(require, exports, TimedValue) {
    
    var SceneNodePointAdapter = (function (_super) {
        __extends(SceneNodePointAdapter, _super);
        function SceneNodePointAdapter(sceneNode) {
            this.SceneNode = sceneNode;
            _super.call(this, null);
        }
        SceneNodePointAdapter.prototype.get = function (t) {
            return this.SceneNode.getPosition(t);
        };
        SceneNodePointAdapter.prototype.set = function (t, value) {
            return this.SceneNode.setAbsolutePosition(t, value);
        };
        return SceneNodePointAdapter;
    })(TimedValue);
    return SceneNodePointAdapter;
});
//# sourceMappingURL=SceneNodePointAdapter.js.map
