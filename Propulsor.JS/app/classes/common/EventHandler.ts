
export = EventHandler;
class EventHandler
{ 
    Handler: any;
    Context: any;

    constructor(handler:any, context: any) { 
        this.Handler = handler;
        this.Context = context;
    }
}
