define(["require", "exports"], function(require, exports) {
    var Timer = (function () {
        function Timer(from, callback) {
            this._from = from;
            this._callback = callback;
            this._offset = 0;
            this._timerId = 0;
            this._isStarted = false;
        }
        Timer.prototype.start = function () {
            if(this._timerId) {
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
        };
        Timer.prototype.stop = function () {
            this._isStarted = false;
            window.cancelAnimationFrame(this._timerId);
        };
        Timer.prototype.getTickCount = function () {
            return new Date().getTime();
        };
        return Timer;
    })();
    exports.Timer = Timer;    
})
