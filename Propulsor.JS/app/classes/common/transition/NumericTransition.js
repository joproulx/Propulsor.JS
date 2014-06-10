var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "classes/common/transition/Transition", "classes/common/transition/BasicInterpolators"], function(require, exports, Transition, BasicInterpolators) {
    

    var NumericTransition = (function (_super) {
        __extends(NumericTransition, _super);
        function NumericTransition(tween) {
            _super.call(this, BasicInterpolators.Numeric, tween);
        }
        return NumericTransition;
    })(Transition);
    return NumericTransition;
});
//# sourceMappingURL=NumericTransition.js.map
