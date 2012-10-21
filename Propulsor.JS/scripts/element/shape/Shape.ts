import GuidGenerator = module("common/GuidGenerator");
import IRenderable = module("element/shape/IRenderable");
import LinearTimedValue = module("common/timedValue/LinearTimedValue");
import TimedValue = module("common/timedValue/TimedValue");
import ShapeRenderer = module("element/renderer/ShapeRenderer");

export class JSonPath
{ 
    IsClosedPath: bool;
    Origin: any;
    Items: any[];
}

export class Shape implements IRenderable.IRenderable {
    Id: string;
    Path: any;
    Renderer: ShapeRenderer.ShapeRenderer;
    StrokeColor: TimedValue.TimedValue;
    StrokeOpacity: TimedValue.TimedValue;
    StrokeRatio: { Start: TimedValue.TimedValue; End: TimedValue.TimedValue; };
    StrokeDashOffset: TimedValue.TimedValue;
    StrokeDashPattern: TimedValue.TimedValue;
    
    constructor (path: any) {
        this.Id = GuidGenerator.generateGuid();
        this.Renderer = null;
        this.Path = path;
        this.StrokeColor = new LinearTimedValue.LinearTimedValue({ R: 0, G: 0, B: 0 });
        this.StrokeOpacity = new LinearTimedValue.LinearTimedValue(1);
        this.StrokeRatio = { Start: new LinearTimedValue.LinearTimedValue(0), End: new LinearTimedValue.LinearTimedValue(1) }
        this.StrokeDashOffset = new LinearTimedValue.LinearTimedValue(0);
        // TODO: Add PatternMode: Ratio or Length
        this.StrokeDashPattern = new TimedValue.TimedValue(null);
        this.StrokeDashPattern.set(0, [-1]);
    }
    createShapeRenderer() {
        return new ShapeRenderer.ShapeRenderer(this);
    }
    render(t: number, context: any) {
        if (this.Renderer == null) {
            this.Renderer = this.createShapeRenderer();
        }

        this.Renderer.render(t, context);
    }
}