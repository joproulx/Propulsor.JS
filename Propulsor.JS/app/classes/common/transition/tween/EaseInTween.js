var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "classes/common/transition/tween/Tween"], function(require, exports, Tween) {
    
    var EaseInTween = (function (_super) {
        __extends(EaseInTween, _super);
        function EaseInTween() {
            _super.call(this);
        }
        EaseInTween.prototype.getRatio = function (t, start, end) {
            var ratio = _super.prototype.getRatio.call(this, t, start, end);
            var newT = t / (end - start);
            return -(newT) * (newT - 2);
        };
        return EaseInTween;
    })(Tween);
    return EaseInTween;
});
//# sourceMappingURL=EaseInTween.js.map
