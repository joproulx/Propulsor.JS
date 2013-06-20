define(["require", "exports", "libs/sylvester/sylvesterLib"], function(require, exports, __sylvester__) {
    var sylvester = __sylvester__;

    var $M = sylvester;
    var TransformationMatrix = (function () {
        function TransformationMatrix(array) {
            this._matrix = $M(array);
        }
        Object.defineProperty(TransformationMatrix, "NoTransformation", {
            get: function () {
                return new TransformationMatrix([
                    [
                        1, 
                        0, 
                        0
                    ], 
                    [
                        0, 
                        1, 
                        0
                    ], 
                    [
                        0, 
                        0, 
                        1
                    ]
                ]);
            },
            enumerable: true,
            configurable: true
        });
        TransformationMatrix.fromArray = function fromArray(array) {
            return new TransformationMatrix(array);
        };
        TransformationMatrix.fromTranslation = function fromTranslation(tx, ty) {
            return new TransformationMatrix([
                [
                    1, 
                    0, 
                    tx
                ], 
                [
                    0, 
                    1, 
                    ty
                ], 
                [
                    0, 
                    0, 
                    1
                ]
            ]);
        };
        TransformationMatrix.fromTransformation = function fromTransformation(tx, ty, radians) {
            var costheta = Math.cos(radians);
            var sintheta = Math.sin(radians);
            return new TransformationMatrix([
                [
                    costheta, 
                    -sintheta, 
                    tx
                ], 
                [
                    sintheta, 
                    costheta, 
                    ty
                ], 
                [
                    0, 
                    0, 
                    1
                ]
            ]);
        };
        TransformationMatrix.fromRotation = function fromRotation(radians) {
            var costheta = Math.cos(radians);
            var sintheta = Math.sin(radians);
            return new TransformationMatrix([
                [
                    costheta, 
                    -sintheta, 
                    0
                ], 
                [
                    sintheta, 
                    costheta, 
                    0
                ], 
                [
                    0, 
                    0, 
                    1
                ]
            ]);
        };
        TransformationMatrix.fromScale = function fromScale(scaleX, scaleY) {
            return new TransformationMatrix([
                [
                    scaleX, 
                    0, 
                    0
                ], 
                [
                    0, 
                    scaleY, 
                    0
                ], 
                [
                    0, 
                    0, 
                    1
                ]
            ]);
        };
        TransformationMatrix.fromSkewX = function fromSkewX(skewX) {
            return new TransformationMatrix([
                [
                    1, 
                    Math.tan(skewX), 
                    0
                ], 
                [
                    0, 
                    1, 
                    0
                ], 
                [
                    0, 
                    0, 
                    1
                ]
            ]);
        };
        TransformationMatrix.fromSkewY = function fromSkewY(skewY) {
            return new TransformationMatrix([
                [
                    1, 
                    0, 
                    0
                ], 
                [
                    Math.tan(skewY), 
                    1, 
                    0
                ], 
                [
                    0, 
                    0, 
                    1
                ]
            ]);
        };
        TransformationMatrix.prototype.getElement = function (row, column) {
            return this._matrix.e(row, column);
        };
        TransformationMatrix.prototype.getRotationRadian = function () {
            return Math.acos(this.getElement(1, 1));
        };
        TransformationMatrix.prototype.getTranslationX = function () {
            return this.getElement(1, 3);
        };
        TransformationMatrix.prototype.getTranslationY = function () {
            return this.getElement(2, 3);
        };
        TransformationMatrix.prototype.transforms = function (matrix) {
            return this._matrix.x(matrix._matrix);
        };
        TransformationMatrix.prototype.getRelativeTranslation = function (x, y) {
            var tx = this.getTranslationX();
            var ty = this.getTranslationY();
            var cosTheta = this.getElement(1, 1);
            var sinTheta = this.getElement(2, 1);
            var resultX = x;
            var resultY = y;
            if(cosTheta == 0) {
                var test = 0;
            } else {
                var tanTheta = sinTheta / cosTheta;
                x = ((resultX - tx + tanTheta * resultY - tanTheta * ty) / cosTheta) / (1 + (tanTheta * tanTheta));
                y = (resultY - ty - sinTheta * x) / cosTheta;
            }
            return TransformationMatrix.fromTranslation(x, y);
        };
        return TransformationMatrix;
    })();
    exports.TransformationMatrix = TransformationMatrix;    
})
