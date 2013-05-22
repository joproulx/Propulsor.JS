export import SceneManager = module("SceneManager");
export import IRenderable = module("element/shape/IRenderable");
export import TimeLineControl = module("TimeLineControl");
export import jQuery = module("libs/jquery/jqueryLib");
var $: any = jQuery;

export class SampleCanvas {
    Context = null;
    Canvas = null;
    BackgroundContext = null;
    BackgroundCanvas = null;
    m_lastTimestamp = 0;
    m_showFps = 0;

    private m_drawGrid = true;
    private m_sceneManager = null;
    private m_timeLineControl = null;
    private m_startTimestamps;
    private m_timestampsIndex;
    private m_sum;
    m_timeLineControl;

    constructor (name: string, div) {
        this.m_startTimestamps = 0;
        this.m_timestampsIndex = 0;
        this.m_sum = 0;
        
        var getId = function (id) {
            return name + "_" + id;
        }
        div.innerHTML = '<div id="' + getId('') + '" style="position:relative; width:800px; height:450px">\
                                <canvas id="layer1" style="z-index:1;position:absolute;left:0;top:0;" height="450px" width="800">\
                                    HTML5 not supported in your browser.\
                                </canvas>\
                                <canvas id="layer2" style="z-index: 2;position:absolute;left:0;top:0;" height="450px" width="800">\
                                    HTML5 not supported in your browser.\
                                </canvas>\
                                <canvas id="layer3" style="z-index: 3;position:absolute;left:0;top:0;" height="450px" width="800">\
                                    HTML5 not supported in your browser.\
                                </canvas>\
                            </div>\
                            <button type="button" id="'+getId("buttonName")+ '">Play</button>\
                            <button type="button" id="'+getId("buttonGrid")+ '">Grid</button>\
                            FPS: <span id="fps" style="#C0C0C0">0</span>\
        <div id="'+ getId('timeLine') + '"/>';
        
                        $("button#" + getId("buttonName")).click($.proxy(this.onClickPlay, this));
                        $("button#" + getId("buttonGrid")).click($.proxy(this.onClickDisplayGrid, this));

                        this.BackgroundCanvas = $('div#' + getId('') + ' canvas#layer1').get(0);
                        this.BackgroundContext = this.BackgroundCanvas.getContext('2d');
        this.Canvas = $('div#' + getId('') + ' canvas#layer2').get(0);
        this.Context = this.Canvas.getContext('2d');

        this.m_sceneManager = new SceneManager.SceneManager(0, 20000, this.Context);

        this.m_timeLineControl = new TimeLineControl.TimeLineControl(this.m_sceneManager.TimeLineController, this.Canvas, document.getElementById(getId('timeLine')));

        this.m_sceneManager.TimeLineController.BeforeRenderEvent.subscribe(this.onBeforeRendered, this);
        this.m_sceneManager.TimeLineController.AfterRenderEvent.subscribe(this.onAfterRendered, this);

        this.drawGrid();
    }
    addToScene(elements: IRenderable.IRenderable[]) {
        for (var i = 0; i < elements.length; i++) {
            this.m_sceneManager.addToScene(elements[i]);
        }

        this.m_sceneManager.renderScene(0, this.Context);
    }
    drawGrid() {
        this.BackgroundContext.clearRect(0, 0, 800, 450);

        this.BackgroundContext.fillStyle = "#FAF7F8";
        this.BackgroundContext.beginPath();
        this.BackgroundContext.rect(0, 0, 800, 450);
        this.BackgroundContext.closePath();
        this.BackgroundContext.fill();

        if (this.m_drawGrid) {
            var i;
            for (i = 0; i < this.Canvas.height; i += 50) {

                this.BackgroundContext.save();
                this.BackgroundContext.strokeStyle = "gray";
                this.BackgroundContext.lineWidth = 1;
                this.BackgroundContext.moveTo(0.5, i + 0.5);
                this.BackgroundContext.lineTo(this.Canvas.width + 0.5, i + 0.5);
                this.BackgroundContext.stroke();
                this.BackgroundContext.restore();
            }

            for (i = 0; i < this.Canvas.width; i += 50) {
                this.BackgroundContext.save();
                this.BackgroundContext.strokeStyle = "gray";
                this.BackgroundContext.lineWidth = 1;
                this.BackgroundContext.moveTo(i + 0.5, 0.5);
                this.BackgroundContext.lineTo(i + 0.5, this.Canvas.height + 0.5);
                this.BackgroundContext.stroke();
                this.BackgroundContext.restore();
            }
        }
    }
    onClickDisplayGrid() {
        this.m_drawGrid = !this.m_drawGrid;
        this.drawGrid();
    }
    onClickPlay() {
        if (this.m_sceneManager.TimeLineController.IsStarted) {
            this.m_sceneManager.TimeLineController.stop();
        }
        else {
            this.m_sceneManager.TimeLineController.start(this.m_sceneManager.TimeLineController.CurrentTime);
        }
    }
    onBeforeRendered(from: SampleCanvas, t: number, context: any) {
        from.Context.clearRect(0, 0, from.Canvas.width, from.Canvas.height);

        if (from.m_startTimestamps == 0) {
            from.m_startTimestamps = t;
            from.m_lastTimestamp = t;
        } 
        else { 
            from.m_timestampsIndex += 1;
        }
        var diff = t - from.m_lastTimestamp;

        from.m_sum += diff;
               
        from.m_lastTimestamp = t;

        if (from.m_timestampsIndex > 0 && (t - from.m_startTimestamps > 1000)) { 
            
            $('span#fps').html(Math.round(1000 * from.m_timestampsIndex/ from.m_sum));

            from.m_sum = 0;
            from.m_startTimestamps = 0;
            from.m_timestampsIndex = 0;
        }
    }
    onAfterRendered(from: SampleCanvas, t: number, context: any) {
        
        
        
        context.save();
        context.beginPath();
        context.fillStyle = 'rgba(100,100,100,1)';

        // var rgb = this.Shape.StrokeColor.get(t);
        // TODO: optimize how the rgb are passed to canvas
        context.strokeStyle = 'rgba(100,100,100,1)';
        context.lineWidth = 1;
        
//context.arc(x, y, radius, 0 , 2 * Math.PI, false);

        context.closePath();
        context.fill();
        context.stroke();
        context.restore();
    }
}