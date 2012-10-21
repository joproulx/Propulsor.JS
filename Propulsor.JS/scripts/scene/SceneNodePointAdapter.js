var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports", "common/timedValue/TimedValue"], function(require, exports, __TimedValue__) {
    var TimedValue = __TimedValue__;

    
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
            return this.SceneNode.setPosition(t, value);
        };
        return SceneNodePointAdapter;
    })(TimedValue.TimedValue);
    exports.SceneNodePointAdapter = SceneNodePointAdapter;    
})

