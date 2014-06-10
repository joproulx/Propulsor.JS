define(["require", "exports"], function(require, exports) {
    
    var Color = (function () {
        function Color(r, g, b) {
            this.R = r;
            this.G = g;
            this.B = b;
        }
        Color.White = new Color(255, 255, 255);
        Color.Black = new Color(0, 0, 0);
        Color.Blue = new Color(0, 0, 255);
        Color.Aqua = new Color(0, 255, 255);
        Color.Fuchsia = new Color(255, 0, 255);
        Color.Gray = new Color(128, 128, 128);
        Color.Green = new Color(0, 128, 0);
        Color.Lime = new Color(0, 255, 0);
        Color.Maroon = new Color(128, 0, 0);
        Color.Navy = new Color(0, 0, 128);
        Color.Olive = new Color(128, 128, 0);
        Color.Purple = new Color(128, 0, 128);
        Color.Red = new Color(255, 0, 0);
        Color.Silver = new Color(192, 192, 192);
        Color.Teal = new Color(0, 128, 128);
        Color.Yellow = new Color(255, 255, 0);
        return Color;
    })();
    return Color;
});
//# sourceMappingURL=Color.js.map
