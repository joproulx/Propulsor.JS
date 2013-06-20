define(["require", "exports", "common/TransformationMatrix", "element/shape/LineShape"], function(require, exports, __TM__, __LineShape__) {
    var TM = __TM__;

    var LineShape = __LineShape__;

    
    var SvgAttribute = (function () {
        function SvgAttribute() {
            this._attributesMap = {
                'cx': 'left',
                'x': 'left',
                'cy': 'top',
                'y': 'top',
                'r': 'radius',
                'fill-opacity': 'opacity',
                'fill-rule': 'fillRule',
                'stroke-width': 'strokeWidth',
                'stroke-dasharray': 'strokeDashArray',
                'stroke-linecap': 'strokeLineCap',
                'stroke-linejoin': 'strokeLineJoin',
                'stroke-miterlimit': 'strokeMiterLimit',
                'transform': 'transformMatrix',
                'text-decoration': 'textDecoration',
                'font-size': 'fontSize',
                'font-weight': 'fontWeight',
                'font-style': 'fontStyle',
                'font-family': 'fontFamily'
            };
        }
        SvgAttribute.normalizeAttributeName = function normalizeAttributeName(attributeName) {
            if(attributeName in this._attributesMap) {
                return this._attributesMap[attributeName];
            }
            return attributeName;
        };
        SvgAttribute.normalizeAttributeValue = function normalizeAttributeValue(attributeName, value, parentAttributes) {
            var isArray;
            if((attributeName === 'fill' || attributeName === 'stroke') && value === 'none') {
                value = '';
            } else if(attributeName === 'fillRule') {
                value = (value === 'evenodd') ? 'destination-over' : value;
            } else if(attributeName === 'strokeDashArray') {
                value = value.replace(/,/g, ' ').split(/\s+/);
            } else if(attributeName === 'transformMatrix') {
                if(parentAttributes && parentAttributes.transformMatrix) {
                    var parentTransformation = SvgMatrix.toTranformationMatrix(parentAttributes.transformMatrix);
                    var childTransformation = SvgTransform.toTransformationMatrix(value);
                    value = parentTransformation.transforms(childTransformation);
                } else {
                    value = SvgTransform.toTransformationMatrix(value);
                }
            }
            isArray = Object.prototype.toString.call(value) === '[object Array]';
            var parsed = isArray ? value.map(parseFloat) : parseFloat(value);
            return (!isArray && isNaN(parsed) ? value : parsed);
        };
        SvgAttribute.parse = function parse(element, attributes) {
            if(!element) {
                return;
            }
            var value, parentAttributes = {
            };
            if(element.parentNode && /^g$/i.test(element.parentNode.nodeName)) {
                parentAttributes = SvgAttribute.parse(element.parentNode, attributes);
            }
            var ownAttributes = attributes.reduce(function (memo, attr) {
                value = element.getAttribute(attr);
                if(value) {
                    attr = SvgAttribute.normalizeAttributeName(attr);
                    value = SvgAttribute.normalizeAttributeValue(attr, value, parentAttributes);
                    memo[attr] = value;
                }
                return memo;
            }, {
            });
        };
        SvgAttribute.extend = function extend(destination, source) {
            for(var property in source) {
                destination[property] = source[property];
            }
            return destination;
        };
        return SvgAttribute;
    })();
    exports.SvgAttribute = SvgAttribute;    
    var SvgLineElement = (function () {
        function SvgLineElement() { }
        SvgLineElement.parse = function parse(element) {
            var parsedAttributes = SvgAttribute.parse(element, [
                'x1', 
                'y1', 
                'x2', 
                'y2'
            ]);
            return new LineShape.LineShape(0, (parsedAttributes.x1 || 0), (parsedAttributes.y1 || 0), (parsedAttributes.x2 || 0), (parsedAttributes.y2 || 0));
        };
        return SvgLineElement;
    })();
    exports.SvgLineElement = SvgLineElement;    
    var SvgStyle = (function () {
        function SvgStyle() { }
        SvgStyle.parseFontDeclaration = function parseFontDeclaration(value, oStyle) {
            var match = value.match(/(normal|italic)?\s*(normal|small-caps)?\s*(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\s*(\d+)px\s+(.*)/);
            if(!match) {
                return;
            }
            var fontStyle = match[1];
            var fontWeight = match[3];
            var fontSize = match[4];
            var fontFamily = match[5];
            if(fontStyle) {
                oStyle.fontStyle = fontStyle;
            }
            if(fontWeight) {
                oStyle.fontSize = isNaN(parseFloat(fontWeight)) ? fontWeight : parseFloat(fontWeight);
            }
            if(fontSize) {
                oStyle.fontSize = parseFloat(fontSize);
            }
            if(fontFamily) {
                oStyle.fontFamily = fontFamily;
            }
        };
        SvgStyle.parseStyle = function parseStyle(name, value, oStyle) {
            if(name === 'font') {
                SvgStyle.parseFontDeclaration(value, oStyle);
            } else {
                oStyle[name] = value;
            }
        };
        SvgStyle.prototype.parse = function (attribute) {
            var oStyle = {
            };
            var name;
            var value;
            if(!attribute) {
                return oStyle;
            }
            if(typeof attribute === 'string') {
                attribute.replace(/;$/, '').split(';').forEach(function (chunk) {
                    var pair = chunk.split(':');
                    name = SvgAttribute.normalizeAttributeName(pair[0].trim().toLowerCase());
                    value = SvgAttribute.normalizeAttributeValue(name, pair[1].trim());
                    SvgStyle.parseStyle(name, value, oStyle);
                });
            } else {
                for(var prop in attribute) {
                    if(typeof attribute[prop] === 'undefined') {
                        continue;
                    }
                    name = SvgAttribute.normalizeAttributeName(prop.toLowerCase());
                    value = SvgAttribute.normalizeAttributeValue(name, attribute[prop]);
                    SvgStyle.parseStyle(name, value, oStyle);
                }
            }
            return oStyle;
        };
        return SvgStyle;
    })();
    exports.SvgStyle = SvgStyle;    
    var SvgMatrix = (function () {
        function SvgMatrix() { }
        SvgMatrix.toTranformationMatrix = function toTranformationMatrix(matrixArray) {
            return TM.TransformationMatrix.fromArray([
                [
                    matrixArray[0], 
                    matrixArray[2], 
                    matrixArray[4]
                ], 
                [
                    matrixArray[1], 
                    matrixArray[3], 
                    matrixArray[5]
                ], 
                [
                    0, 
                    0, 
                    1
                ]
            ]);
        };
        return SvgMatrix;
    })();
    exports.SvgMatrix = SvgMatrix;    
    var SvgTransform = (function () {
        function SvgTransform() { }
        SvgTransform.getRotationMatrix = function getRotationMatrix(args) {
            if(args.length === 3) {
                var matrix = TM.TransformationMatrix.fromTranslation(args[1], args[2]);
                matrix = matrix.transforms(TM.TransformationMatrix.fromRotation(args[0]));
                return matrix.transforms(TM.TransformationMatrix.fromTranslation(-args[1], -args[2]));
            }
            return TM.TransformationMatrix.fromRotation(args[0]);
        };
        SvgTransform.getScaleMatrix = function getScaleMatrix(args) {
            var multiplierX = args[0];
            var multiplierY = (args.length === 2) ? args[1] : args[0];
            return TM.TransformationMatrix.fromScale(multiplierX, multiplierY);
        };
        SvgTransform.getSkewXMatrix = function getSkewXMatrix(args) {
            return TM.TransformationMatrix.fromSkewX(args[0]);
        };
        SvgTransform.getSkewYMatrix = function getSkewYMatrix(args) {
            return TM.TransformationMatrix.fromSkewY(args[0]);
        };
        SvgTransform.getTransformationMatrix = function getTransformationMatrix(args) {
            return TM.TransformationMatrix.fromArray([
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
        SvgTransform.getTranslateMatrix = function getTranslateMatrix(args) {
            var x = args[0];
            var y = 0;
            if(args.length === 2) {
                y = args[1];
            }
            return TM.TransformationMatrix.fromTranslation(x, y);
        };
        SvgTransform.toTransformationMatrix = function toTransformationMatrix(attributeValue) {
            var value = '(?:[-+]?\\d+(?:\\.\\d+)?(?:e[-+]?\\d+)?)';
            var comma_wsp = '(?:\\s+,?\\s*|,\\s*)';
            var skewX = '(?:(skewX)\\s*\\(\\s*(' + value + ')\\s*\\))';
            var skewY = '(?:(skewY)\\s*\\(\\s*(' + value + ')\\s*\\))';
            var rotate = '(?:(rotate)\\s*\\(\\s*(' + value + ')(?:' + comma_wsp + '(' + value + ')' + comma_wsp + '(' + value + '))?\\s*\\))';
            var scale = '(?:(scale)\\s*\\(\\s*(' + value + ')(?:' + comma_wsp + '(' + value + '))?\\s*\\))';
            var translate = '(?:(translate)\\s*\\(\\s*(' + value + ')(?:' + comma_wsp + '(' + value + '))?\\s*\\))';
            var matrix = '(?:(matrix)\\s*\\(\\s*' + '(' + value + ')' + comma_wsp + '(' + value + ')' + comma_wsp + '(' + value + ')' + comma_wsp + '(' + value + ')' + comma_wsp + '(' + value + ')' + comma_wsp + '(' + value + ')' + '\\s*\\))';
            var transform = '(?:' + matrix + '|' + translate + '|' + scale + '|' + rotate + '|' + skewX + '|' + skewY + ')';
            var transforms = '(?:' + transform + '(?:' + comma_wsp + transform + ')*' + ')';
            var transform_list = '^\\s*(?:' + transforms + '?)\\s*$';
            var regexTransformList = new RegExp(transform_list);
            var regexTransform = new RegExp(transform, 'g');
            var matrices;
            if(!attributeValue || !regexTransformList.test(attributeValue)) {
                return TM.TransformationMatrix.NoTransformation;
            }
            var thisObj = this;
            attributeValue.replace(regexTransform, function (match) {
                var m = new RegExp(transform).exec(match).filter(function (match) {
                    return (match !== '' && match != null);
                });
                var operation = m[1];
                var args = m.slice(2).map(parseFloat);
                var matrix;
                switch(operation) {
                    case 'translate':
                        matrix = thisObj.getTranslateMatrix(args);
                        break;
                    case 'rotate':
                        matrix = thisObj.getRotationMatrix(args);
                        break;
                    case 'scale':
                        matrix = thisObj.getScaleMatrix(args);
                        break;
                    case 'skewX':
                        matrix = thisObj.getSkewXMatrix(args);
                        break;
                    case 'skewY':
                        matrix = thisObj.getSkewYMatrix(args);
                        break;
                    case 'matrix':
                        matrix = thisObj.getTransformationMatrix(args);
                        break;
                }
                matrices.push(matrix);
                return match;
            });
            var combinedMatrix = matrices[0];
            while(matrices.length > 1) {
                matrices.shift();
                combinedMatrix = combinedMatrix.transforms(matrices[0]);
            }
            return combinedMatrix;
        };
        return SvgTransform;
    })();
    exports.SvgTransform = SvgTransform;    
})
