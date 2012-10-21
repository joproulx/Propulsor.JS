define(["require", "exports", "SceneManager"], function(require, exports, __SceneManager__) {
    var SceneManager = __SceneManager__;

    
    var SampleCanvas = (function () {
        function SampleCanvas(name) {
            this.Context = null;
            this.Canvas = null;
            this.BackgroundContext = null;
            this.BackgroundCanvas = null;
            this.m_drawGrid = true;
            this.m_sceneManager = null;
            this.m_timeLineControl = null;
            var getId = function (id) {
                return name + "_" + id;
            };
            $("body").prepend('<div id="' + getId('') + '" style="position:relative; width:800px; height:450px">\
                        <canvas id="layer2" style="z-index: 2;position:absolute;left:0;top:0;" height="450px" width="800">\
                            HTML5 not supported in your browser.\
                        </canvas>\
                    </div>\
                    <button type="button" id="' + getId("buttonName") + '">Play</button>\
                    <button type="button" id="' + getId("buttonGrid") + '">Grid</button>');
            $("button#" + getId("buttonName")).click($.proxy(this.onClickPlay, this));
            $("button#" + getId("buttonGrid")).click($.proxy(this.onClickDisplayGrid, this));
            $("body").prepend('<div id="' + getId('') + '" style="position:relative; width:800px; height:450px">\
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
                            <button type="button" id="' + getId("buttonName") + '">Play</button>\
                            <button type="button" id="' + getId("buttonGrid") + '">Grid</button>');
            $("button#" + getId("buttonName")).click($.proxy(this.onClickPlay, this));
            $("button#" + getId("buttonGrid")).click($.proxy(this.onClickDisplayGrid, this));
            this.BackgroundCanvas = $('div#' + getId('') + ' canvas#layer1').get(0);
            this.BackgroundContext = this.BackgroundCanvas.getContext('2d');
            this.Canvas = $('div#' + getId('') + ' canvas#layer2').get(0);
            this.Context = this.Canvas.getContext('2d');
            this.m_sceneManager = new SceneManager.SceneManager(0, 20000, this.Context);
            this.m_sceneManager.TimeLineController.BeforeRenderEvent.subscribe(this.onBeforeRendered, this);
            this.drawGrid();
        }
        SampleCanvas.prototype.addToScene = function (elements) {
            for(var i = 0; i < elements.length; i++) {
                this.m_sceneManager.addToScene(elements[i]);
            }
            this.m_sceneManager.renderScene(0, this.Context);
        };
        SampleCanvas.prototype.drawGrid = function () {
            this.BackgroundContext.clearRect(0, 0, 800, 450);
            this.BackgroundContext.fillStyle = "#FAF7F8";
            this.BackgroundContext.beginPath();
            this.BackgroundContext.rect(0, 0, 800, 450);
            this.BackgroundContext.closePath();
            this.BackgroundContext.fill();
            if(this.m_drawGrid) {
                var i;
                for(i = 0; i < this.Canvas.height; i += 50) {
                    this.BackgroundContext.save();
                    this.BackgroundContext.strokeStyle = "gray";
                    this.BackgroundContext.lineWidth = 1;
                    this.BackgroundContext.moveTo(0.5, i + 0.5);
                    this.BackgroundContext.lineTo(this.Canvas.width + 0.5, i + 0.5);
                    this.BackgroundContext.stroke();
                    this.BackgroundContext.restore();
                }
                for(i = 0; i < this.Canvas.width; i += 50) {
                    this.BackgroundContext.save();
                    this.BackgroundContext.strokeStyle = "gray";
                    this.BackgroundContext.lineWidth = 1;
                    this.BackgroundContext.moveTo(i + 0.5, 0.5);
                    this.BackgroundContext.lineTo(i + 0.5, this.Canvas.height + 0.5);
                    this.BackgroundContext.stroke();
                    this.BackgroundContext.restore();
                }
            }
        };
        SampleCanvas.prototype.onClickDisplayGrid = function () {
            this.m_drawGrid = !this.m_drawGrid;
            this.drawGrid();
        };
        SampleCanvas.prototype.onClickPlay = function () {
            if(this.m_sceneManager.TimeLineController.IsStarted) {
                this.m_sceneManager.TimeLineController.stop();
            } else {
                this.m_sceneManager.TimeLineController.start(this.m_sceneManager.TimeLineController.CurrentTime);
            }
        };
        SampleCanvas.prototype.onBeforeRendered = function (from, t, context) {
            from.Context.clearRect(0, 0, from.Canvas.width, from.Canvas.height);
        };
        return SampleCanvas;
    })();
    exports.SampleCanvas = SampleCanvas;    
})

