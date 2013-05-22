export import sylvester = module("libs/sylvester/sylvesterLib");
export import transformationMatrixHelper = module("common/TransformationMatrixHelper");
var $M: any = sylvester;


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

//Code taken from: https://github.com/kangax/fabric.js/blob/master/src/parser.js
export class Transform {

    private getRotationMatrix(args) {
        var matrix = transformationMatrixHelper.getRotationMatrix(args[0]);
        if (args.length === 3) { 
            matrix = transformationMatrixHelper.getTranslationMatrix(args[0], args[1])
                     .x(matrix)
                     .x(transformationMatrixHelper.getTranslationMatrix(-args[0], -args[1]));
        }
        
        return matrix;
    }

    private getScaleMatrix(args) {
        var multiplierX = args[0],
            multiplierY = (args.length === 2) ? args[1] : args[0];
        return transformationMatrixHelper.getScaleMatrix(multiplierX, multiplierY);
    }

    private getSkewXMatrix(args) {
        return transformationMatrixHelper.getSkewXMatrix(args[0]);
    }

    private getSkewYMatrix(args) {
        return transformationMatrixHelper.getSkewYMatrix(args[0]);
    }

    private getTransformationMatrix(args) {
        return $M([
                   [args[0], args[2], args[4]],
                   [args[1], args[3], args[5]],
                   [0, 0, 1]
        ]);
    }


    private getTranslateMatrix(args) {
        var x = args[0];
        var y = 0;
        if (args.length === 2) {
            y = args[1];
        }

        return transformationMatrixHelper.getTranslationMatrix(x, y);
    }

    public parse(attributeValue) {

        // identity matrix
        var iMatrix = transformationMatrixHelper.getIdentityMatrix();

        // == begin transform regexp
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

        // http://www.w3.org/TR/SVG/coords.html#TransformAttribute
        var reTransformList = new RegExp(transform_list);
        // == end transform regexp

        var reTransform = new RegExp(transform, 'g');

        var matrices = [];

        // return if no argument was given or
        // an argument does not match transform attribute regexp
        if (!attributeValue || (attributeValue && !reTransformList.test(attributeValue))) {
            return transformationMatrixHelper.getIdentityMatrix();
        }

        var thisObj = this;
        attributeValue.replace(reTransform, function (match) {

            var m = new RegExp(transform).exec(match).filter(function (match) {
                return (match !== '' && match != null);
            }),
                operation = m[1],
                args = m.slice(2).map(parseFloat);

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

            // snapshot current matrix into matrices array
            matrices.push(matrix);
        });

        var combinedMatrix = matrices[0];
        while (matrices.length > 1) {
            matrices.shift();
            combinedMatrix = combinedMatrix.x(matrices[0]);
        }
        return combinedMatrix;
    }
}
