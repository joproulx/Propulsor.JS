import Event = require("classes/common/Event");
import RenderingLoop = require("classes/common/RenderingLoop");

export = TimeLineController;
class TimeLineController {

    Context;
    BeforeRenderEvent;
    AfterRenderEvent;
    RenderEvent;
    StartTimestamp;
    EndTimestamp;
    CurrentTime;
    m_timer;
    IsStarted;

    constructor (startTimestamp, endTimestamp, context) {
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
    start(startTime: number) {
        this.IsStarted = true;
        this.CurrentTime = startTime;
        this.m_timer.start();
    }
    stop() {
        this.IsStarted = false;
        this.m_timer.stop();
    }
    seek(t: number) {
        this.CurrentTime = t;

        if (!this.IsStarted) {
            this.renderFrame(this.CurrentTime, this.Context);
        }
    }
    onRender(from, elapsedTime) {
        from.CurrentTime += elapsedTime;
        from.renderFrame(from.CurrentTime, from.Context);
    }
    renderFrame(t: number, context) {
        this.BeforeRenderEvent.trigger(t, context, null);
        this.RenderEvent.trigger(t, context, null);
        this.AfterRenderEvent.trigger(t, context, null);
    }
}