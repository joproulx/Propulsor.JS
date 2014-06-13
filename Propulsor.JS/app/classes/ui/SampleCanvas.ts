import SceneManager = require("classes/scene/SceneManager");
import IRenderable = require("classes/element/shape/IRenderable");
import TimeLineControl = require("classes/ui/TimeLineControl");

export = SampleCanvas;
class SampleCanvas {
    public Context: any = null;
    public Canvas: any = null;
    public BackgroundContext: any = null;
    public BackgroundCanvas: any = null;
    private m_lastTimestamp = 0;
    private m_showFps = 0;

    private m_drawGrid = true;
    private m_sceneManager: SceneManager = null;
    private m_timeLineControl: TimeLineControl = null;
    private m_startTimestamps: any;
    private m_timestampsIndex: any;
    private m_sum: any;
    private m_sampleId: string;
    private m_containerSearchString: string = '';
    private m_buttonPlay: JQuery;
    private m_spanFPS: JQuery;
    private m_rootElement: JQuery;

    constructor(name: string, id: string, timelineLengthInMS: number) {
        this.m_sampleId = id;
        this.m_startTimestamps = 0;
        this.m_timestampsIndex = 0;
        this.m_sum = 0;

        var divContainer = $('<div/>', {
            id: 'container_' + id,
        });

        this.m_containerSearchString = 'div#container_' + id + ' ';
        this.m_rootElement = divContainer;
        
        var divCanvas = $('<div/>', {
            id: 'canvas',
            style: 'position: relative; width:800px; height:450px'
        }).appendTo(divContainer);

        
   

        var divInfo = $('<div/>', {
            id: 'info',
            style: 'z-index:99999;line-height:12px;margin:5px;padding:5px;position:absolute;background-color:rgba(100, 100, 100, 0.5)',
            height: '80px',
            width: '130px'
        }).appendTo(divCanvas);

        
        this.m_spanFPS = $('<span/>', {
            id: 'fps',
            text: 'FPS:',
            style: 'font-size:10px'
        }).appendTo(divInfo);
        $('<br/>').appendTo(divInfo);
        var spanPosition = $('<span/>', {
            id: 'position',
            text: 'Position:',
            style: 'font-size:10px'
        }).appendTo(divInfo);


        divCanvas.mousemove(function (eventObject: JQueryMouseEventObject) {
            spanPosition.html('Position: X=' + eventObject.offsetX + ', Y=' + eventObject.offsetY)
        });

        divCanvas.mouseleave(function (eventObject: JQueryMouseEventObject) {
            spanPosition.html('Position:');
        });
        
        var canvas1 = this.generateCanvas('layer1', 800, 450, 1).appendTo(divCanvas);
        var canvas2 = this.generateCanvas('layer2', 800, 450, 2).appendTo(divCanvas);
        var canvas3 = this.generateCanvas('layer3', 800, 450, 3).appendTo(divCanvas);
        divCanvas.appendTo(divContainer);
        
        var buttonBack = this.generateButton('buttonBack', '|<').appendTo(divContainer);
        this.m_buttonPlay = this.generateButton('buttonPlay', '>').appendTo(divContainer);
        var buttonGrid = this.generateButton('buttonGrid', '#').appendTo(divContainer);
        
        var divTimeline = $('<div/>', {
            id: 'timeline'
        }).appendTo(divContainer);

        buttonBack.click($.proxy(this.onClickBack, this));

        this.m_buttonPlay.click($.proxy(this.onClickPlay, this));

        buttonGrid.click($.proxy(this.onClickDisplayGrid, this));

        this.BackgroundCanvas = canvas1.get(0);
        this.BackgroundContext = this.BackgroundCanvas.getContext('2d');
        this.Canvas = canvas2.get(0);
        this.Context = this.Canvas.getContext('2d');

        this.m_sceneManager = new SceneManager(0, timelineLengthInMS, this.Context);

        this.m_timeLineControl = new TimeLineControl(this.m_sceneManager.TimeLineController, this.Canvas, divTimeline);

        this.m_sceneManager.TimeLineController.BeforeRenderEvent.subscribe(this.onBeforeRendered, this);
        this.m_sceneManager.TimeLineController.AfterRenderEvent.subscribe(this.onAfterRendered, this);

        this.drawGrid();
    }

    public toJQuery(): JQuery{
        return this.m_rootElement;
    }

    private generateCanvas(name: string, width: number, height: number, zIndex: number): JQuery {
        // Because of what seems a bug, the canvas html tag is not closed when generated, I generate canvas html like this.
        return $('<canvas id="' + name + '" style="z-index:' + zIndex + ';position:absolute; left: 0; top: 0;" height="' + height + 'px"' + ' width="' + width + 'px">HTML5 not supported in your browser.</canvas>');
    }

    private generateButton(name: string, text: string): JQuery {
        return $('<button/>', {
            id: name,
            type: 'button',
            text: text
        });
    }
    //private getElement(id: string): JQuery {
    //    var query = this.m_containerSearchString + id;
    //    return $(query);
    //}

    //private getId(id: string): string {
    //    return this.m_canvasName + "_" + id;
    //}

    addToScene(elements: IRenderable[]) {
        for (var i = 0; i < elements.length; i++) {
            this.m_sceneManager.addToScene(elements[i], "test");
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
                this.BackgroundContext.lineTo((this.Canvas.width + 0.5), i + 0.5);
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
            this.m_buttonPlay.html(">");
            this.m_sceneManager.TimeLineController.stop();
        }
        else {
            var test = this.m_buttonPlay;
            var test1 = test.html();
            this.m_buttonPlay.html("||");
            test1 = test.html();
            this.m_sceneManager.TimeLineController.start(this.m_sceneManager.TimeLineController.CurrentTime);
        }
    }

    onClickBack() {
        this.m_sceneManager.TimeLineController.seek(0);
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

            from.m_spanFPS.html('FPS: ' +(Math.round(1000 * from.m_timestampsIndex / from.m_sum)).toString());

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