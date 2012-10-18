import Event = module("scripts/common/Event");
import Timer = module("scripts/common/Timer");

export class TimeLineController {

    Context;
    BeforeRenderEvent;
    RenderEvent;
    StartTimestamp;
    EndTimestamp;
    CurrentTime;
    m_timer;
    IsStarted;

    constructor (startTimestamp, endTimestamp, context) {
        this.Context = context;
        this.BeforeRenderEvent = new Event.Event();
        this.RenderEvent = new Event.Event();
        this.StartTimestamp = startTimestamp;
        this.EndTimestamp = endTimestamp;
        this.CurrentTime = 0;
        this.m_timer = new Timer.Timer(this, this.onTimeout);
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
    onTimeout(from, elapsedTime) {
        from.CurrentTime += elapsedTime;

        // $("div#test").html(elapsedTime);

        from.renderFrame(from.CurrentTime, from.Context);
    }
    renderFrame(t: number, context) {
        this.BeforeRenderEvent.trigger(t, context);
        this.RenderEvent.trigger(t, context);
    }
}