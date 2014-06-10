define(["require", "exports"], function(require, exports) {
    
    var EventHandler = (function () {
        function EventHandler(handler, context) {
            this.Handler = handler;
            this.Context = context;
        }
        return EventHandler;
    })();
    return EventHandler;
});
//# sourceMappingURL=EventHandler.js.map
