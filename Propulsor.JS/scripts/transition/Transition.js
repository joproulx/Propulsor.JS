define(["require", "exports", "transition/ITransition"], function(require, exports, __ITransition__) {
    var ITransition = __ITransition__;

    var Transition = (function () {
        function Transition() {
            this.StartTimestamp = null;
            ; ;
            this.EndTimestamp = null;
            ; ;
            this.StartValue = null;
            ; ;
            this.EndValue = null;
            ; ;
        }
        Transition.prototype.getValue = function (t) {
            return null;
        };
        return Transition;
    })();
    exports.Transition = Transition;    
})

