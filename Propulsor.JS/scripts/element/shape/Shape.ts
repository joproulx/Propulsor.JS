export import GuidGenerator = module("common/GuidGenerator");
export import IRenderable = module("element/shape/IRenderable");
export import LinearTimedValue = module("common/timedValue/LinearTimedValue");
export import TimedValue = module("common/timedValue/TimedValue");
export import ShapeRenderer = module("element/renderer/ShapeRenderer");
export import Path = module("element/path/Path");
export import SceneNode = module("sceneGraph/SceneNode");
export import Movable = module("element/Movable");

export class StrokeConfiguration {
    Style: DrawStyle;
    Ratio: Ratio;
    Dash: Dash;

    constructor () {
        this.Ratio = new Ratio();
        this.Dash = new Dash();
        this.Style = ColorStyle.Blue;
    }
}

export class DrawStyle { 
    toString() { 
        return "";
    }
}


export class Color {
    R: number;
    G: number;
    B: number;

    static White: Color = new Color(255, 255, 255);
    static Black: Color = new Color(0,0,0);
    static Blue: Color = new Color(0,0,255);

    constructor (r:number, g:number, b:number) { 
        this.R = r;
        this.G = g;
        this.B = b;
    }
}

export class ColorStyle extends DrawStyle { 
    Color: Color;
    Opacity: number;

    constructor (color: Color, opacity: number) { 
        super();
        
        this.Color = color;
        this.Opacity = opacity;
    }

    static fromRgb(r: number, g: number, b: number, ) { return new ColorStyle(new Color(r, g, b), 1); }

    static White: ColorStyle = new ColorStyle(Color.White, 1);
    static Black: ColorStyle = new ColorStyle(Color.Black, 1);
    static Blue: ColorStyle = new ColorStyle(Color.Blue, 1);
    
    toString() { 
        return'rgba(' + Math.round(this.Color.R) + ', ' + Math.round(this.Color.G) + ', ' + Math.round(this.Color.B) + ', ' + this.Opacity + ')';
    }
}

export class FillConfiguration {
    Style: DrawStyle;
    
    constructor () {
        this.Style = ColorStyle.Black;
    }
}

export class Dash {
    Offset: TimedValue.TimedValue;
    Pattern: TimedValue.TimedValue;

    constructor () {
        this.Offset = new LinearTimedValue.LinearTimedValue(0);
        this.Pattern = new TimedValue.TimedValue(null);
        this.Pattern.set(0, [-1]);
        // TODO: Create a transition for the dash pattern array
    }
}

export class Ratio {
    Start: TimedValue.TimedValue;
    End: TimedValue.TimedValue;

    constructor () {
        this.Start = new LinearTimedValue.LinearTimedValue(0);
        this.End = new LinearTimedValue.LinearTimedValue(1);
    }
}

export interface IShape extends IRenderable.IRenderable extends SceneNode.IMovable {

}

export class Shape extends Movable.MovableWrapper implements IShape {
    Id: string;
    Path: Path.IPath;
    Renderer: ShapeRenderer.ShapeRenderer;
    Stroke: StrokeConfiguration;
    Fill: FillConfiguration;
    
    constructor (path: Path.IPath) {
        super(path);
        this.Id = GuidGenerator.generateGuid();
        this.Renderer = null;
        this.Path = path;
        this.Stroke = new StrokeConfiguration();
        this.Fill = new FillConfiguration();
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