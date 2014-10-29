define(["require", "exports"], function(require, exports) {
    
    var TimeLineControl = (function () {
        function TimeLineControl(timeLineController, canvas, div) {
            div.append('<div id="timelineController" style="position:relative; width:800px; height:50px">\
                                <canvas id="layer1" style="z-index:1;position:absolute;left:0;top:0;" height="50px" width="800">\
                                    HTML5 not supported in your browser.\
                                </canvas>\
                                <canvas id="layer2" style="z-index: 2;position:absolute;left:0;top:0;" height="50px" width="800">\
                                    HTML5 not supported in your browser.\
                                </canvas>\
                                <canvas id="layer3" style="z-index: 3;position:absolute;left:0;top:0;" height="50px" width="800">\
                                    HTML5 not supported in your browser.\
                                </canvas>\
                            </div>');

            this.BackgroundCanvas = div.find('canvas#layer1').get(0);
            this.BackgroundContext = this.BackgroundCanvas.getContext('2d');
            this.Canvas = div.find('canvas#layer2').get(0);
            this.m_context = this.Canvas.getContext('2d');

            var thisObj = this;
            this.Canvas.addEventListener('mouseup', function (ev) {
                if (ev.clientX >= 0 && ev.clientX <= thisObj.Canvas.width && ev.clientY >= thisObj.Canvas.height - 14 && ev.clientY < thisObj.Canvas.height) {
                    var percent = ev.clientX / thisObj.Canvas.width;
                    var t = percent * (thisObj.m_timeLineController.EndTimestamp - thisObj.m_timeLineController.StartTimestamp) + thisObj.m_timeLineController.StartTimestamp;
                    timeLineController.seek(t);
                }
            }, false);

            this.m_timeLineController = timeLineController;
            this.m_timeLineController.RenderEvent.subscribe(this.onRender, this);

            this.BackgroundContext.save();
            this.BackgroundContext.beginPath();
            this.BackgroundContext.strokeStyle = '#000000';
            this.BackgroundContext.lineWidth = 2;
            this.BackgroundContext.moveTo(0, this.Canvas.height - 10);
            this.BackgroundContext.lineTo(this.Canvas.width, this.Canvas.height - 10);
            this.BackgroundContext.stroke();
            this.BackgroundContext.restore();
        }
        TimeLineControl.prototype.onRender = function (thisObj, t) {
            var ratio = (t - thisObj.m_timeLineController.StartTimestamp) / (thisObj.m_timeLineController.EndTimestamp - thisObj.m_timeLineController.StartTimestamp);

            var posX = (ratio * thisObj.Canvas.width);

            thisObj.m_context.clearRect(0, 0, thisObj.Canvas.width, thisObj.Canvas.height);

            thisObj.m_context.save();
            thisObj.m_context.beginPath();
            thisObj.m_context.strokeStyle = '#000000';
            thisObj.m_context.lineWidth = 4;
            thisObj.m_context.moveTo(posX, thisObj.Canvas.height - 14);
            thisObj.m_context.lineTo(posX, thisObj.Canvas.height - 6);
            thisObj.m_context.stroke();
            thisObj.m_context.restore();
        };
        TimeLineControl.prototype.dispose = function () {
            this.m_timeLineController.RenderEvent.unsubscribe(this.onRender);
        };
        return TimeLineControl;
    })();
    return TimeLineControl;
});
//# sourceMappingURL=TimeLineControl.js.map
