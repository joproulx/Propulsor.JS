export class Timer {
    private _from: Object;
    private _callback: (from: Object, elapsed: number) => void;
    private _offset: number;
    private _timerId: number;
    private _isStarted: bool;

    constructor (from: Object, callback: (from: Object, elapsed: number) => void) {
        this._from = from;
        this._callback = callback;
        this._offset = 0;
        this._timerId = 0;
        this._isStarted = false;
    }
    start() {
        if (this._timerId) {
            this.stop();
        }

        this._offset = this.getTickCount();

        var thisObj = this;

        function render() {
            var tickCount = thisObj.getTickCount();

            var elapsedTime = tickCount - thisObj._offset;
            thisObj._offset = tickCount;

            thisObj._callback(thisObj._from, elapsedTime);
            thisObj._timerId = window.requestAnimationFrame(render);
        }
        this._timerId = window.requestAnimationFrame(render);
        this._isStarted = true;
    }
    stop() {
        this._isStarted = false;
        window.cancelAnimationFrame(this._timerId);
    }
    getTickCount() {
        return new Date().getTime();
    }
}