var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var Tween = (function () {
        function Tween() {
        }
        Tween.prototype.getRatio = function (t, start, end) {
            return (t - start) / (end - start);
        };
        return Tween;
    })();
    exports.Tween = Tween;    
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
    exports.EaseInTween = EaseInTween;    
})
