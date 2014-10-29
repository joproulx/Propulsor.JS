define(["require", "exports", "classes/common/Event", "classes/common/RenderingLoop"], function(require, exports, Event, RenderingLoop) {
    
    var TimeLineController = (function () {
        function TimeLineController(startTimestamp, endTimestamp, context) {
            this.Context = context;
            this.BeforeRenderEvent = new Event();
            this.RenderEvent = new Event();
            this.AfterRenderEvent = new Event();
            this.StartTimestamp = startTimestamp;
            this.EndTimestamp = endTimestamp;
            this.CurrentTime = 0;
            this.m_timer = new RenderingLoop(this, this.onRender);
            this.IsStarted = false;
        }
        TimeLineController.prototype.start = function (startTime) {
            this.IsStarted = true;
            this.CurrentTime = startTime;
            this.m_timer.start();
        };
        TimeLineController.prototype.stop = function () {
            this.IsStarted = false;
            this.m_timer.stop();
        };
        TimeLineController.prototype.seek = function (t) {
            this.CurrentTime = t;

            if (!this.IsStarted) {
                this.renderFrame(this.CurrentTime, this.Context);
            }
        };
        TimeLineController.prototype.onRender = function (from, elapsedTime) {
            from.CurrentTime += elapsedTime;

            if (from.CurrentTime >= this.EndTimestamp) {
                this.stop();
                this.seek(this.EndTimestamp);
                return;
            }

            from.renderFrame(from.CurrentTime, from.Context);
        };
        TimeLineController.prototype.renderFrame = function (t, context) {
            this.BeforeRenderEvent.trigger(t, context, null);
            this.RenderEvent.trigger(t, context, null);
            this.AfterRenderEvent.trigger(t, context, null);
        };
        return TimeLineController;
    })();
    return TimeLineController;
});
//# sourceMappingURL=TimeLineController.js.map
