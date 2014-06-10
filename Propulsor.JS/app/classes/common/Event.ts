import EventHandler = require("classes/common/EventHandler");

export = Event;

class Event {
    private _eventHandlers: EventHandler[];

    constructor () { 
        this._eventHandlers = new Array();
    }
    subscribe(eventHandler: any, context: Object) {
        this._eventHandlers.push(new EventHandler(eventHandler, context));
    }
    unsubscribe(eventHandler) {
        var index = this._eventHandlers.indexOf(eventHandler);
        if (index != -1) {
            this._eventHandlers.splice(index, 1);
        }
    }
    trigger(arg1: any, arg2: any, arg3: any) {
        for (var i = 0; i < this._eventHandlers.length; i++) {
            this._eventHandlers[i].Handler(this._eventHandlers[i].Context, arg1, arg2, arg3);
        }
    }
}