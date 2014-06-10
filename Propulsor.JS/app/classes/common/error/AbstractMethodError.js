define(["require", "exports"], function(require, exports) {
    
    var AbstractMethodError = (function () {
        function AbstractMethodError() {
            this.message = "Abstract method called";
        }
        return AbstractMethodError;
    })();
    return AbstractMethodError;
});
//# sourceMappingURL=AbstractMethodError.js.map
