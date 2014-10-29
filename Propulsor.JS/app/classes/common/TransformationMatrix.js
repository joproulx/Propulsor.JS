define(["require", "exports"], function(require, exports) {
    
    var TransformationMatrix = (function () {
        function TransformationMatrix(array) {
            if (array !== undefined) {
                this._matrix = $M(array);
            }
        }
        Object.defineProperty(TransformationMatrix, "NoTransformation", {
            get: function () {
                return new TransformationMatrix([
                    [1, 0, 0],
                    [0, 1, 0],
                    [0, 0, 1]]);
            },
            enumerable: true,
            configurable: true
        });

        TransformationMatrix.fromArray = function (array) {
            return new TransformationMatrix(array);
        };

        TransformationMatrix.fromMatrix = function (matrix) {
            var transformationMatrix = new TransformationMatrix();
            transformationMatrix._matrix = matrix;
            return transformationMatrix;
        };

        TransformationMatrix.fromTranslation = function (tx, ty) {
            return new TransformationMatrix([
                [1, 0, tx],
                [0, 1, ty],
                [0, 0, 1]]);
        };

        TransformationMatrix.fromTransformation = function (tx, ty, radians) {
            var costheta = Math.cos(radians);
            var sintheta = Math.sin(radians);

            return new TransformationMatrix([
                [costheta, -sintheta, tx],
                [sintheta, costheta, ty],
                [0, 0, 1]]);
        };

        TransformationMatrix.fromRotation = function (radians) {
            var costheta = Math.cos(radians);
            var sintheta = Math.sin(radians);
            return new TransformationMatrix([
                [costheta, -sintheta, 0],
                [sintheta, costheta, 0],
                [0, 0, 1]]);
        };

        TransformationMatrix.fromScale = function (scaleX, scaleY) {
            return new TransformationMatrix([
                [scaleX, 0, 0],
                [0, scaleY, 0],
                [0, 0, 1]]);
        };

        TransformationMatrix.fromSkewX = function (skewX) {
            return new TransformationMatrix([
                [1, Math.tan(skewX), 0],
                [0, 1, 0],
                [0, 0, 1]]);
        };

        TransformationMatrix.fromSkewY = function (skewY) {
            return new TransformationMatrix([
                [1, 0, 0],
                [Math.tan(skewY), 1, 0],
                [0, 0, 1]]);
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

        TransformationMatrix.prototype.equals = function (other) {
            if (other === null || other === undefined) {
                return false;
            }

            return this._matrix.eql(other._matrix);
        };

        TransformationMatrix.prototype.getTranslationY = function () {
            return this.getElement(2, 3);
        };

        TransformationMatrix.prototype.transforms = function (matrix) {
            return TransformationMatrix.fromMatrix(this._matrix.x(matrix._matrix));
        };

        // ----------------------------------------------------------------------------
        // We want to determine the translation in the transformed coordinate system
        // that gave us the specified point in the cartesian coordinate system
        //
        // The transition is defined with this matrix:
        // [cos(theta), -sin(theta), tx]
        // [sin(theta),  cos(theta), ty]
        // [0         ,  0         , 1]
        //
        // This gives us these equations:
        // x' = tx + cos(theta)*x - sin(theta)*y
        // y' = ty + sin(theta)*x - cos(theta)*y
        //
        // 2 equations with 2 unkwnowns... that what this function solves
        // ----------------------------------------------------------------------------
        TransformationMatrix.prototype.getRelativeTranslation = function (x, y) {
            var tx = this.getTranslationX();
            var ty = this.getTranslationY();
            var cosTheta = this.getElement(1, 1);
            var sinTheta = this.getElement(2, 1);
            var resultX = x;
            var resultY = y;

            if (cosTheta == 0) {
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
    return TransformationMatrix;
});
//# sourceMappingURL=TransformationMatrix.js.map
