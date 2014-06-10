define(["require", "exports"], function(require, exports) {
    

    var ArrayInterpolator = (function () {
        function ArrayInterpolator(arrayItemInterpolator) {
            this._arrayItemInterpolator = arrayItemInterpolator;
        }
        ArrayInterpolator.prototype.getValue = function (t, start, end, ratio) {
            var lenght = start.length > end.length ? start.length : end.length;

            var newArray = [];
            for (var i = 0; i < lenght; i++) {
                if (start.length <= i) {
                    newArray[i] = end[i];
                    continue;
                }

                if (end.length <= i) {
                    newArray[i] = start[i];
                    continue;
                }

                newArray[i] = this._arrayItemInterpolator.getValue(t, start[i], end[i], ratio);
            }

            return newArray;
        };
        return ArrayInterpolator;
    })();
    return ArrayInterpolator;
});
//# sourceMappingURL=ArrayInterpolator.js.map
