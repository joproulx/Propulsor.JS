//importLineSegment = require("element/segment/LineSegment");
//importSegmentRenderer = require("element/renderer/SegmentRenderer");
import IDrawingContext = require("classes/element/renderer/drawingContext/IDrawingContext");

export = CanvasDrawingContext;
class CanvasDrawingContext implements IDrawingContext {
    private _context: any;

    constructor (context: any) {
        this._context = context;
    }
    
    public save() { }
    public beginPath(){ }
    public endPath(){ }
    public setFillStyle(){ }
    public setStrokeStyle(){ }
    public stroke(){ }
    public restore(){ }
    public fill(){ }
    public closePath(){ }
}