define(["require", "exports", "libs/sylvester/sylvesterLib", "common/TransformationMatrixHelper"], function(require, exports, __sylvester__, __transformationMatrixHelper__) {
    var sylvester = __sylvester__;

    var transformationMatrixHelper = __transformationMatrixHelper__;

    var $M = sylvester;
    var Transform = (function () {
        function Transform() { }
        Transform.prototype.getRotationMatrix = function (args) {
            var angle = args[0];
            return transformationMatrixHelper.getRotationMatrix(angle);
        };
        Transform.prototype.getScaleMatrix = function (args) {
            var multiplierX = args[0], multiplierY = (args.length === 2) ? args[1] : args[0];
            return transformationMatrixHelper.getScaleMatrix(multiplierX, multiplierY);
        };
        Transform.prototype.getSkewXMatrix = function (args) {
            return transformationMatrixHelper.getSkewXMatrix(args[0]);
        };
        Transform.prototype.getSkewYMatrix = function (args) {
            return transformationMatrixHelper.getSkewYMatrix(args[0]);
        };
        Transform.prototype.getTransformationMatrix = function (args) {
            return $M([
                [
                    args[0], 
                    args[2], 
                    args[4]
                ], 
                [
                    args[1], 
                    args[3], 
                    args[5]
                ], 
                [
                    0, 
                    0, 
                    1
                ]
            ]);
        };
        Transform.prototype.getTranslateMatrix = function (args) {
            var x = args[0];
            var y = 0;
            if(args.length === 2) {
                y = args[1];
            }
            return transformationMatrixHelper.getTranslationMatrix(x, y);
        };
        Transform.prototype.parse = function (attributeValue) {
            var iMatrix = transformationMatrixHelper.getIdentityMatrix(), value = '(?:[-+]?\\d+(?:\\.\\d+)?(?:e[-+]?\\d+)?)', comma_wsp = '(?:\\s+,?\\s*|,\\s*)', skewX = '(?:(skewX)\\s*\\(\\s*(' + value + ')\\s*\\))', skewY = '(?:(skewY)\\s*\\(\\s*(' + value + ')\\s*\\))', rotate = '(?:(rotate)\\s*\\(\\s*(' + value + ')(?:' + comma_wsp + '(' + value + ')' + comma_wsp + '(' + value + '))?\\s*\\))', scale = '(?:(scale)\\s*\\(\\s*(' + value + ')(?:' + comma_wsp + '(' + value + '))?\\s*\\))', translate = '(?:(translate)\\s*\\(\\s*(' + value + ')(?:' + comma_wsp + '(' + value + '))?\\s*\\))', matrix = '(?:(matrix)\\s*\\(\\s*' + '(' + value + ')' + comma_wsp + '(' + value + ')' + comma_wsp + '(' + value + ')' + comma_wsp + '(' + value + ')' + comma_wsp + '(' + value + ')' + comma_wsp + '(' + value + ')' + '\\s*\\))', transform = '(?:' + matrix + '|' + translate + '|' + scale + '|' + rotate + '|' + skewX + '|' + skewY + ')', transforms = '(?:' + transform + '(?:' + comma_wsp + transform + ')*' + ')', transform_list = '^\\s*(?:' + transforms + '?)\\s*$', reTransformList = new RegExp(transform_list), reTransform = new RegExp(transform, 'g');
            var matrices = [];
            if(!attributeValue || (attributeValue && !reTransformList.test(attributeValue))) {
                return transformationMatrixHelper.getIdentityMatrix();
            }
            var thisObj = this;
            attributeValue.replace(reTransform, function (match) {
                var m = new RegExp(transform).exec(match).filter(function (match) {
return (match !== '' && match != null);                }), operation = m[1], args = m.slice(2).map(parseFloat);
                var matrix;
                switch(operation) {
                    case 'translate': {
                        matrix = thisObj.getTranslateMatrix(args);
                        break;

                    }
                    case 'rotate': {
                        matrix = thisObj.getRotationMatrix(args);
                        break;

                    }
                    case 'scale': {
                        matrix = thisObj.getScaleMatrix(args);
                        break;

                    }
                    case 'skewX': {
                        matrix = thisObj.getSkewXMatrix(args);
                        break;

                    }
                    case 'skewY': {
                        matrix = thisObj.getSkewYMatrix(args);
                        break;

                    }
                    case 'matrix': {
                        matrix = thisObj.getTransformationMatrix(args);
                        break;

                    }
                }
                matrices.push(matrix);
            });
            var combinedMatrix = matrices[0];
            while(matrices.length > 1) {
                matrices.shift();
                combinedMatrix = combinedMatrix.x(matrices[0]);
            }
            return combinedMatrix;
        };
        return Transform;
    })();
    exports.Transform = Transform;    
})
