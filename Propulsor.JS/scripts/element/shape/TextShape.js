define(["require", "exports"], function(require, exports) {
    var TextShape = (function () {
        function TextShape(text, x, y) {
            this.Text = text;
            this.FillStyle = '#AAAAAA';
            this.Font = 'bold 24px segoe';
            this.TextBaseline = 'top';
            this.X = x;
            this.Y = y;
        }
        TextShape.prototype.render = function (context) {
            context.fillStyle = this.FillStyle;
            context.font = this.Font;
            context.textBaseline = this.TextBaseline;
            context.fillText(this.Text, this.X, this.Y);
        };
        return TextShape;
    })();
    exports.TextShape = TextShape;    
})

