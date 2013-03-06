define(["require", "exports", "libs/sylvester/sylvesterLib"], function(require, exports, __sylvester__) {
    var sylvester = __sylvester__;

    var $M = sylvester;
    function getRotationMatrix(rad) {
        var costheta = Math.cos(rad);
        var sintheta = Math.sin(rad);
        return $M([
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
    }
    exports.getRotationMatrix = getRotationMatrix;
    function getTranslationMatrix(x, y) {
        return $M([
            [
                1, 
                0, 
                x
            ], 
            [
                0, 
                1, 
                y
            ], 
            [
                0, 
                0, 
                1
            ]
        ]);
    }
    exports.getTranslationMatrix = getTranslationMatrix;
    function getTransformationMatrix(rad, tx, ty) {
        var costheta = Math.cos(rad);
        var sintheta = Math.sin(rad);
        return $M([
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
    }
    exports.getTransformationMatrix = getTransformationMatrix;
    function getTransformationFromPoint(matrix, x, y) {
        var tx = matrix.e(1, 3);
        var ty = matrix.e(2, 3);
        var cosTheta = matrix.e(1, 1);
        var sinTheta = matrix.e(2, 1);
        var resultX = x;
        var resultY = y;
        if(cosTheta == 0) {
            var test = 0;
        } else {
            var tanTheta = sinTheta / cosTheta;
            x = ((resultX - tx + tanTheta * resultY - tanTheta * ty) / cosTheta) / (1 + (tanTheta * tanTheta));
            y = (resultY - ty - sinTheta * x) / cosTheta;
        }
        return this.getTranslationMatrix(x, y);
    }
    exports.getTransformationFromPoint = getTransformationFromPoint;
    function getRotationRadian(matrix) {
        return Math.acos(matrix.e(1, 1));
    }
    exports.getRotationRadian = getRotationRadian;
    function getTranslationX(matrix) {
        return matrix.e(1, 3);
    }
    exports.getTranslationX = getTranslationX;
    function getTranslationY(matrix) {
        return matrix.e(2, 3);
    }
    exports.getTranslationY = getTranslationY;
})
