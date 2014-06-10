
export = Color;
class Color {
    R: number;
    G: number;
    B: number;

    static White: Color = new Color(255, 255, 255);
    static Black: Color = new Color(0, 0, 0);
    static Blue: Color = new Color(0, 0, 255);
    static Aqua: Color = new Color(0, 255, 255);
    static Fuchsia: Color = new Color(255, 0, 255);
    static Gray: Color = new Color(128, 128, 128);
    static Green: Color = new Color(0, 128, 0);
    static Lime: Color = new Color(0, 255, 0);
    static Maroon: Color = new Color(128, 0, 0);
    static Navy: Color = new Color(0, 0, 128);
    static Olive: Color = new Color(128, 128, 0);
    static Purple: Color = new Color(128, 0, 128);
    static Red: Color = new Color(255, 0, 0);
    static Silver: Color = new Color(192, 192, 192);
    static Teal: Color = new Color(0, 128, 128);
    static Yellow: Color = new Color(255, 255, 0);

    constructor(r: number, g: number, b: number) {
        this.R = r;
        this.G = g;
        this.B = b;
    }
}
