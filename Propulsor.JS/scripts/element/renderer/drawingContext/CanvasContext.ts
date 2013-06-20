//importLineSegment = module("element/segment/LineSegment");
//importSegmentRenderer = module("element/renderer/SegmentRenderer");

export interface IDrawingContext {
    save();
    beginPath();
    endPath();
    setFillStyle();
    setStrokeStyle();
    stroke();
    restore();
    fill();
    closePath();
}

export class CanvasContext implements IDrawingContext {
    private _context: any;

    constructor (context: any) {
        this._context = context;
    }
    
    save() { }
    beginPath(){ }
    endPath(){ }
    setFillStyle(){ }
    setStrokeStyle(){ }
    stroke(){ }
    restore(){ }
    fill(){ }
    closePath(){ }
}