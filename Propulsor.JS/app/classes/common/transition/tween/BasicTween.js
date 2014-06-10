define(["require", "exports"], function(require, exports) {
    
    var BasicTween = (function () {
        function BasicTween() {
        }
        BasicTween.prototype.getRatio = function (t, start, end) {
            return (t - start) / (end - start);
        };
        return BasicTween;
    })();
    return BasicTween;
});
//# sourceMappingURL=BasicTween.js.map
