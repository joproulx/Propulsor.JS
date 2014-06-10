export = IDrawingContext;

interface IDrawingContext {
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
