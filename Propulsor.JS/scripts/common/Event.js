define(["require", "exports"], function(require, exports) {
    var EventHandler = (function () {
        function EventHandler(handler, context) {
            this.Handler = handler;
            this.Context = context;
        }
        return EventHandler;
    })();    
    var Event = (function () {
        function Event() {
            this._eventHandlers = new Array();
        }
        Event.prototype.subscribe = function (eventHandler, context) {
            this._eventHandlers.push(new EventHandler(eventHandler, context));
        };
        Event.prototype.unsubscribe = function (eventHandler) {
            var index = this._eventHandlers.indexOf(eventHandler);
            if(index != -1) {
                this._eventHandlers.splice(index, 1);
            }
        };
        Event.prototype.trigger = function (arg1, arg2, arg3) {
            for(var i = 0; i < this._eventHandlers.length; i++) {
                this._eventHandlers[i].Handler(this._eventHandlers[i].Context, arg1, arg2, arg3);
            }
        };
        return Event;
    })();
    exports.Event = Event;    
})

