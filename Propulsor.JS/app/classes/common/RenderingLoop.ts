
export = RenderingLoop;

class RenderingLoop {
    private _from: Object;
    private _callback: (from: Object, elapsed: number) => void;
    private _offset: number;
    private _timerId: number;
    private _isStarted: boolean;

    constructor(from: Object, callback: (from: Object, elapsed: number) => void) {
        this._from = from;
        this._callback = callback;
        this._offset = 0;
        this._timerId = 0;
        this._isStarted = false;
    }
    public start() {
        if (this._timerId) {
            this.stop();
        }

        this._offset = this.getTickCount();

        var thisObj = this;

        function render() {
            if (thisObj._isStarted) {
                var tickCount = thisObj.getTickCount();
                thisObj.renderFrame(tickCount);

                thisObj._timerId = window.requestAnimationFrame(render);
            }
        }
        this._timerId = window.requestAnimationFrame(render);
        this._isStarted = true;
    }
    public renderFrame(tickCount: number) {
        
        var elapsedTime = tickCount - this._offset;
        this._offset = tickCount;

        this._callback(this._from, elapsedTime);
    }
    public stop() {
        this._isStarted = false;
        window.cancelAnimationFrame(this._timerId);
    }
    getTickCount() {
        return new Date().getTime();
    }
   
}