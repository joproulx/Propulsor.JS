export import TimedValue = module("common/timedValue/TimedValue");
export import LinearTimedValue = module("common/timedValue/LinearTimedValue");

export enum LineJoinTypes { 
    Miter,
    Round,
    Bevel
}

export class StrokeConfiguration {
    Style: IDrawStyle;
    Ratio: Ratio;
    Dash: Dash;
    LineWidth: TimedValue.TimedValue;
    LineJoinType: LineJoinTypes;

    constructor () {
        this.Ratio = new Ratio();
        this.Dash = new Dash();
        this.Style = ColorStyle.Black;
        this.LineWidth = new LinearTimedValue.LinearTimedValue(1);
    }
}

export interface IDrawStyle { 
    toString(): string;
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

export class ColorStyle implements IDrawStyle { 
    Color: Color;
    Opacity: number;

    constructor (color: Color, opacity: number) { 
        this.Color = color;
        this.Opacity = opacity;
    }

    static fromRgb(r: number, g: number, b: number, ) { return new ColorStyle(new Color(r, g, b), 1); }

    static White: ColorStyle = new ColorStyle(Color.White, 1);
    static Black: ColorStyle = new ColorStyle(Color.Black, 1);
    static Blue: ColorStyle = new ColorStyle(Color.Blue, 1);
    static Transparent: ColorStyle = new ColorStyle(Color.White, 0);
    
    toString(): string { 
        return'rgba(' + Math.round(this.Color.R) + ', ' + Math.round(this.Color.G) + ', ' + Math.round(this.Color.B) + ', ' + this.Opacity + ')';
    }
}

export class FillConfiguration {
    Style: IDrawStyle;
    
    constructor () {
        this.Style = ColorStyle.Transparent;
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