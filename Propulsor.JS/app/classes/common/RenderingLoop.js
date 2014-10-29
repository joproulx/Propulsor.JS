define(["require", "exports"], function(require, exports) {
    

    var RenderingLoop = (function () {
        function RenderingLoop(from, callback) {
            this._from = from;
            this._callback = callback;
            this._offset = 0;
            this._timerId = 0;
            this._isStarted = false;
        }
        RenderingLoop.prototype.start = function () {
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
        };
        RenderingLoop.prototype.renderFrame = function (tickCount) {
            var elapsedTime = tickCount - this._offset;
            this._offset = tickCount;

            this._callback(this._from, elapsedTime);
        };
        RenderingLoop.prototype.stop = function () {
            this._isStarted = false;
            window.cancelAnimationFrame(this._timerId);
        };
        RenderingLoop.prototype.getTickCount = function () {
            return new Date().getTime();
        };
        return RenderingLoop;
    })();
    return RenderingLoop;
});
//# sourceMappingURL=RenderingLoop.js.map
