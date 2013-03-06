define(["require", "exports", "common/Event", "common/Timer"], function(require, exports, __Event__, __Timer__) {
    var Event = __Event__;

    var Timer = __Timer__;

    var TimeLineController = (function () {
        function TimeLineController(startTimestamp, endTimestamp, context) {
            this.Context = context;
            this.BeforeRenderEvent = new Event.Event();
            this.RenderEvent = new Event.Event();
            this.StartTimestamp = startTimestamp;
            this.EndTimestamp = endTimestamp;
            this.CurrentTime = 0;
            this.m_timer = new Timer.Timer(this, this.onTimeout);
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
            if(!this.IsStarted) {
                this.renderFrame(this.CurrentTime, this.Context);
            }
        };
        TimeLineController.prototype.onTimeout = function (from, elapsedTime) {
            from.CurrentTime += elapsedTime;
            from.renderFrame(from.CurrentTime, from.Context);
        };
        TimeLineController.prototype.renderFrame = function (t, context) {
            this.BeforeRenderEvent.trigger(t, context);
            this.RenderEvent.trigger(t, context);
        };
        return TimeLineController;
    })();
    exports.TimeLineController = TimeLineController;    
})
