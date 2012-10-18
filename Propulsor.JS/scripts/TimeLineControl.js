define(["require", "exports"], function(require, exports) {
    
    var TimeLineControl = (function () {
        function TimeLineControl(timeLineController, canvas) {
            this.m_context = canvas.getContext('2d');
            this.m_canvas = canvas;
            var thisObj = this;
            this.m_canvas.addEventListener('mouseup', function (ev) {
                if(ev.clientX >= 0 && ev.clientX <= thisObj.m_canvas.width && ev.clientY >= thisObj.m_canvas.height - 14 && ev.clientY < thisObj.m_canvas.height) {
                    var percent = ev.clientX / thisObj.m_canvas.width;
                    var t = percent * (thisObj.m_timeLineController.EndTimestamp - thisObj.m_timeLineController.StartTimestamp) + thisObj.m_timeLineController.StartTimestamp;
                    timeLineController.seek(t);
                }
            }, false);
            this.m_timeLineController = timeLineController;
            this.m_timeLineController.RenderEvent.subscribe(this.onRender, this);
        }
        TimeLineControl.prototype.onRender = function (thisObj, t) {
            var ratio = (t - thisObj.m_timeLineController.StartTimestamp) / (thisObj.m_timeLineController.EndTimestamp - thisObj.m_timeLineController.StartTimestamp);
            var posX = (ratio * thisObj.m_canvas.width);
            thisObj.m_canvas = document.getElementsByTagName('canvas')[0];
            thisObj.m_context.save();
            thisObj.m_context.beginPath();
            thisObj.m_context.strokeStyle = '#000000';
            thisObj.m_context.lineWidth = 2;
            thisObj.m_context.moveTo(0, thisObj.m_canvas.height - 10);
            thisObj.m_context.lineTo(thisObj.m_canvas.width, thisObj.m_canvas.height - 10);
            thisObj.m_context.stroke();
            thisObj.m_context.restore();
            thisObj.m_context.save();
            thisObj.m_context.beginPath();
            thisObj.m_context.strokeStyle = '#000000';
            thisObj.m_context.lineWidth = 4;
            thisObj.m_context.moveTo(posX, thisObj.m_canvas.height - 14);
            thisObj.m_context.lineTo(posX, thisObj.m_canvas.height - 6);
            thisObj.m_context.stroke();
            thisObj.m_context.restore();
        };
        TimeLineControl.prototype.dispose = function () {
            this.m_timeLineController.RenderEvent.unsubscribe(this.onRender);
        };
        return TimeLineControl;
    })();
    exports.TimeLineControl = TimeLineControl;    
})

