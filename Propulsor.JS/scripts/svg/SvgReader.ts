import TM = module("common/TransformationMatrix");
import LineShape = module("element/shape/LineShape");
import Point = module("common/Point");
import DrawingStyle = module("element/renderer/drawingContext/DrawingStyle");
//export class Element {

//    private _node: any;

//    // TODO: typify node
//    constructor(node: any) {
//        this._node = node;
//        this.extractInfo(node);
//    }

//    public extractInfo(node: any) {

//    }

//}

//export class GroupElement extends Element {

//    // TODO: typify node
//    constructor(node: any) {
//        super(node);
//    }

//    public extractInfo(node: any) {
//        super.extractInfo(node);



//    }

//    private createTransform(node: any) {
//        node.attributes.getNamedItem("t")



//    }
//}

export class SvgDocument {

    private _cssRules;

    public load(doc) {
        this._cssRules = this.getCSSRules(doc);

    }


    getCSSRules(doc) {
        var styles = doc.getElementsByTagName('style'),
            allRules = {},
            rules;

        // very crude parsing of style contents
        for (var i = 0, len = styles.length; i < len; i++) {
            var styleContents = styles[0].textContent;

            // remove comments
            styleContents = styleContents.replace(/\/\*[\s\S]*?\*\//g, '');

            rules = styleContents.match(/[^{]*\{[\s\S]*?\}/g);
            rules = rules.map(function (rule) { return rule.trim(); });

            rules.forEach(function (rule) {
                var match = rule.match(/([\s\S]*?)\s*\{([^}]*)\}/);
                rule = match[1];
                var declaration = match[2].trim(),
                    propertyValuePairs = declaration.replace(/;$/, '').split(/\s*;\s*/);

                if (!allRules[rule]) {
                    allRules[rule] = {};
                }

                for (var i = 0, len = propertyValuePairs.length; i < len; i++) {
                    var pair = propertyValuePairs[i].split(/\s*:\s*/),
                        property = pair[0],
                        value = pair[1];

                    allRules[rule][property] = value;
                }
            });
        }

        return allRules;
    }
}

export class SvgAttribute {

    private _colorAttributes = {
        'stroke': 'strokeOpacity',
        'fill': 'fillOpacity'
    };

    private _attributesMap = {
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

    public static normalizeAttributeName(attributeName: string): string {
        // transform attribute names
        if (attributeName in this._attributesMap) {
            return this._attributesMap[attributeName];
        }
        return attributeName;
    }


    public static normalizeAttributeValue(attributeName, value, parentAttributes?) {
        var isArray;

        if ((attributeName === 'fill' || attributeName === 'stroke') && value === 'none') {
            value = '';
        }
        else if (attributeName === 'fillRule') {
            value = (value === 'evenodd') ? 'destination-over' : value;
        }
        else if (attributeName === 'strokeDashArray') {
            value = value.replace(/,/g, ' ').split(/\s+/);
        }
        else if (attributeName === 'transformMatrix') {
            if (parentAttributes && parentAttributes.transformMatrix) {
                var parentTransformation = SvgMatrix.toTranformationMatrix(parentAttributes.transformMatrix);
                var childTransformation = SvgTransform.toTransformationMatrix(value);
                value = parentTransformation.transforms(childTransformation);
            }
            else {
                value = SvgTransform.toTransformationMatrix(value);
            }
        }

        isArray = Object.prototype.toString.call(value) === '[object Array]';

        // TODO: need to normalize em, %, pt, etc. to px (!)
        var parsed = isArray ? value.map(parseFloat) : parseFloat(value);

        return (!isArray && isNaN(parsed) ? value : parsed);
    }


    public static parse(element, attributes, cssRules) {

        if (!element) {
            return;
        }

        var value,
            parentAttributes = {};

        // if there's a parent container (`g` node), parse its attributes recursively upwards
        if (element.parentNode && /^g$/i.test(element.parentNode.nodeName)) {
            parentAttributes = parse(element.parentNode, attributes, cssRules);
        }

        var ownAttributes = attributes.reduce(function (memo, attr) {
            value = element.getAttribute(attr);
            if (value) {
                attr = SvgAttribute.normalizeAttributeName(attr);
                value = SvgAttribute.normalizeAttributeValue(attr, value, parentAttributes);

                memo[attr] = value;
            }
            return memo;
        }, {});

        // add values parsed from style, which take precedence over attributes
        // (see: http://www.w3.org/TR/SVG/styling.html#UsingPresentationAttributes)

        ownAttributes = extend(ownAttributes,
          extend(this.getGlobalStylesForElement(element, cssRules), SvgStyle.parse(element)));
        return this.setStrokeFillOpacity(extend(parentAttributes, ownAttributes));
    }

    private setStrokeFillOpacity(attributes) {
        for (var attr in this._colorAttributes) {
            if (!attributes[attr] || typeof attributes[this._colorAttributes[attr]] === 'undefined') continue;

            var color = DrawingStyle.ColorStyle.fromArray(attributes[attr]);
            color.Opacity = parseFloat((color.Opacity * attributes[this._colorAttributes[attr]]).toFixed(2));
            attributes[attr] = color.toRgbaString();

            delete attributes[this._colorAttributes[attr]];
        }
        return attributes;
    }

    getGlobalStylesForElement(element, cssRules) {
        var nodeName = element.nodeName,
            className = element.getAttribute('class'),
            id = element.getAttribute('id'),
            styles = {};

        for (var rule in cssRules) {
            var ruleMatchesElement = (className && new RegExp('^\\.' + className).test(rule)) ||
                                     (id && new RegExp('^#' + id).test(rule)) ||
                                     (new RegExp('^' + nodeName).test(rule));

            if (ruleMatchesElement) {
                for (var property in cssRules[rule]) {
                    styles[property] = cssRules[rule][property];
                }
            }
        }

        return styles;
    }

    private static extend(destination, source) {
        // JScript DontEnum bug is not taken care of
        for (var property in source) {
            destination[property] = source[property];
        }
        return destination;
    }
}

export class SvgLineElement {
    public static parse(element, cssRules) {
        var parsedAttributes = SvgAttribute.parse(element, ['x1', 'y1', 'x2', 'y2'], cssRules);
        
        // todo: apply styling fromattributes to the shape
        return new LineShape.LineShape(0,
                                       <number>(parsedAttributes.x1 || 0),
                                       <number>(parsedAttributes.y1 || 0),
                                       <number>(parsedAttributes.x2 || 0),
                                       <number>(parsedAttributes.y2 || 0));
    }
}


export class SvgStyle {
    public static parseFontDeclaration(value, oStyle) {

        // TODO: support non-px font size
        var match = value.match(/(normal|italic)?\s*(normal|small-caps)?\s*(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\s*(\d+)px\s+(.*)/);

        if (!match) return;

        var fontStyle = match[1];
        // Font variant is not used
        // var fontVariant = match[2];
        var fontWeight = match[3];
        var fontSize = match[4];
        var fontFamily = match[5];

        if (fontStyle) {
            oStyle.fontStyle = fontStyle;
        }
        if (fontWeight) {
            oStyle.fontSize = isNaN(parseFloat(fontWeight)) ? fontWeight : parseFloat(fontWeight);
        }
        if (fontSize) {
            oStyle.fontSize = parseFloat(fontSize);
        }
        if (fontFamily) {
            oStyle.fontFamily = fontFamily;
        }

        

    }

    private static parseStyle(name: string, value: string, oStyle) {
        if (name === 'font') {
            SvgStyle.parseFontDeclaration(value, oStyle);
        }
        else {
            oStyle[name] = value;
        }
    }


    public static parse(attribute: any) {
        var oStyle = {};
        var name;
        var value;

        if (!attribute) {
            return oStyle;
        }

        if (typeof attribute === 'string') {
            attribute.replace(/;$/, '').split(';').forEach(function (chunk) {
                var pair = chunk.split(':');

                name = SvgAttribute.normalizeAttributeName(pair[0].trim().toLowerCase());
                value = SvgAttribute.normalizeAttributeValue(name, pair[1].trim());
                SvgStyle.parseStyle(name, value, oStyle);
            });
        }
        else {
            for (var prop in attribute) {
                if (typeof attribute[prop] === 'undefined') continue;

                name = SvgAttribute.normalizeAttributeName(prop.toLowerCase());
                value = SvgAttribute.normalizeAttributeValue(name, attribute[prop]);
                SvgStyle.parseStyle(name, value, oStyle);
            }
        }

        return oStyle;
    }
}

export class SvgMatrix {
    public static toTranformationMatrix(matrixArray: number[][]): TM.TransformationMatrix {
        return TM.TransformationMatrix.fromArray([[matrixArray[0], matrixArray[2], matrixArray[4]],
                                                  [matrixArray[1], matrixArray[3], matrixArray[5]],
                                                  [0, 0, 1]]);
    }


    //public parse(matrix: string): TM.TransformationMatrix { 

    //}

}

//Code taken from: https://github.com/kangax/fabric.js/blob/master/src/parser.js
export class SvgTransform {

    private static getRotationMatrix(args): TM.TransformationMatrix {
        if (args.length === 3) {
            // Rotate is about the point (args[1], args[2]). Equivalent to:
            // translate(args[1], args[2]) -> rotate(args[0]) -> translate(-args[1], -args[2]) 
            var matrix = TM.TransformationMatrix.fromTranslation(args[1], args[2]);
            matrix = matrix.transforms(TM.TransformationMatrix.fromRotation(args[0]));
            return matrix.transforms(TM.TransformationMatrix.fromTranslation(-args[1], -args[2]));
        }
        // Simple rotation
        return TM.TransformationMatrix.fromRotation(args[0]);
    }

    private static getScaleMatrix(args): TM.TransformationMatrix {
        var multiplierX = args[0];
        var multiplierY = (args.length === 2) ? args[1] : args[0];
        return TM.TransformationMatrix.fromScale(multiplierX, multiplierY);
    }

    private static getSkewXMatrix(args): TM.TransformationMatrix {
        return TM.TransformationMatrix.fromSkewX(args[0]);
    }

    private static getSkewYMatrix(args): TM.TransformationMatrix {
        return TM.TransformationMatrix.fromSkewY(args[0]);
    }

    private static getTransformationMatrix(args): TM.TransformationMatrix {
        return TM.TransformationMatrix.fromArray([[args[0], args[2], args[4]],
                                                  [args[1], args[3], args[5]],
                                                  [0, 0, 1]]);
    }


    private static getTranslateMatrix(args): TM.TransformationMatrix {
        var x = args[0];
        var y = 0;
        if (args.length === 2) {
            y = args[1];
        }
        return TM.TransformationMatrix.fromTranslation(x, y);
    }

    // http://www.w3.org/TR/SVG/coords.html#TransformAttribute
    public static toTransformationMatrix(attributeValue: string): TM.TransformationMatrix {

        var value = '(?:[-+]?\\d+(?:\\.\\d+)?(?:e[-+]?\\d+)?)';
        var comma_wsp = '(?:\\s+,?\\s*|,\\s*)';

        var skewX = '(?:(skewX)\\s*\\(\\s*(' + value + ')\\s*\\))';
        var skewY = '(?:(skewY)\\s*\\(\\s*(' + value + ')\\s*\\))';
        var rotate = '(?:(rotate)\\s*\\(\\s*(' + value + ')(?:' + comma_wsp + '(' + value + ')' + comma_wsp + '(' + value + '))?\\s*\\))';
        var scale = '(?:(scale)\\s*\\(\\s*(' + value + ')(?:' + comma_wsp + '(' + value + '))?\\s*\\))';
        var translate = '(?:(translate)\\s*\\(\\s*(' + value + ')(?:' + comma_wsp + '(' + value + '))?\\s*\\))';

        var matrix = '(?:(matrix)\\s*\\(\\s*' +
                    '(' + value + ')' + comma_wsp +
                    '(' + value + ')' + comma_wsp +
                    '(' + value + ')' + comma_wsp +
                    '(' + value + ')' + comma_wsp +
                    '(' + value + ')' + comma_wsp +
                    '(' + value + ')' +
                    '\\s*\\))';

        var transform = '(?:' +
                    matrix + '|' +
                    translate + '|' +
                    scale + '|' +
                    rotate + '|' +
                    skewX + '|' +
                    skewY +
                    ')';

        var transforms = '(?:' + transform + '(?:' + comma_wsp + transform + ')*' + ')';
        var transform_list = '^\\s*(?:' + transforms + '?)\\s*$';

        var regexTransformList = new RegExp(transform_list);
        var regexTransform = new RegExp(transform, 'g');
        var matrices: TM.TransformationMatrix[];

        // return if no argument was given or an argument does not match transform attribute regexp
        if (!attributeValue || !regexTransformList.test(attributeValue)) {
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

            switch (operation) {
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
        while (matrices.length > 1) {
            matrices.shift();
            combinedMatrix = combinedMatrix.transforms(matrices[0]);
        }

        return combinedMatrix;
    }
}
