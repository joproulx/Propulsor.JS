define(["require", "exports", "transition/ITransition", "transition/Tween"], function(require, exports, __ITransition__, __Tween__) {
    var ITransition = __ITransition__;

    var Tween = __Tween__;

    var Transition = (function () {
        function Transition(tween) {
            this.StartTimestamp = null;
            ; ;
            this.EndTimestamp = null;
            ; ;
            this.StartValue = null;
            ; ;
            this.EndValue = null;
            ; ;
            this.Tween = tween ? tween : new Tween.Tween();
        }
        Transition.prototype.getValue = function (t) {
            return null;
        };
        return Transition;
    })();
    exports.Transition = Transition;    
})
