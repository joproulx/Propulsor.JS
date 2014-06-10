export = TransformationMatrix;
class TransformationMatrix {
    private _matrix: any;

    constructor(array?: number[][]) {
        if (array !== undefined) {
            this._matrix = $M(array);
        }
    }

    public static get NoTransformation(): TransformationMatrix {
        return new TransformationMatrix([[1, 0, 0],
                                         [0, 1, 0],
                                         [0, 0, 1]]);
    }

    public static fromArray(array: number[][]): TransformationMatrix {
        return new TransformationMatrix(array);
    }

    private static fromMatrix(matrix: any): TransformationMatrix {
        var transformationMatrix = new TransformationMatrix();
        transformationMatrix._matrix = matrix;
        return transformationMatrix;
    }


    public static fromTranslation(tx: number, ty: number): TransformationMatrix {
        return new TransformationMatrix([[1, 0, tx],
                                         [0, 1, ty],
                                         [0, 0, 1]]);
    }

    public static fromTransformation(tx: number, ty: number, radians: number): TransformationMatrix {
        var costheta = Math.cos(radians);
        var sintheta = Math.sin(radians);

        return new TransformationMatrix([[costheta, -sintheta, tx],
                                         [sintheta, costheta, ty],
                                         [0, 0, 1]]);
    }

    public static fromRotation(radians: number): TransformationMatrix {
        var costheta = Math.cos(radians);
        var sintheta = Math.sin(radians);
        return new TransformationMatrix([[costheta, -sintheta, 0],
                                         [sintheta, costheta, 0],
                                         [0, 0, 1]]);
    }

    public static fromScale(scaleX: number, scaleY: number): TransformationMatrix {
        return new TransformationMatrix([[scaleX, 0, 0],
                                         [0, scaleY, 0],
                                         [0, 0, 1]]);
    }

    public static fromSkewX(skewX: number): TransformationMatrix {
        return new TransformationMatrix([[1, Math.tan(skewX), 0],
                                         [0, 1, 0],
                                         [0, 0, 1]]);
    }

    public static fromSkewY(skewY: number): TransformationMatrix {
        return new TransformationMatrix([[1, 0, 0],
                                         [Math.tan(skewY), 1, 0],
                                         [0, 0, 1]]);
    }

    public getElement(row: number, column: number): number {
        return this._matrix.e(row, column);
    }

    public getRotationRadian(): number {
        return Math.acos(this.getElement(1, 1));
    }

    public getTranslationX(): number {
        return this.getElement(1, 3);
    }

    public getTranslationY(): number {
        return this.getElement(2, 3);
    }

    public transforms(matrix: TransformationMatrix): TransformationMatrix {
        return TransformationMatrix.fromMatrix(this._matrix.x(matrix._matrix));
    }

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
    public getRelativeTranslation(x: number, y: number): TransformationMatrix {
        var tx = this.getTranslationX();
        var ty = this.getTranslationY();
        var cosTheta = this.getElement(1, 1);
        var sinTheta = this.getElement(2, 1);
        var resultX = x;
        var resultY = y;

        if (cosTheta == 0) {
            var test = 0;
        }
        else {
            var tanTheta = sinTheta / cosTheta;
            x = ((resultX - tx + tanTheta * resultY - tanTheta * ty) / cosTheta) / (1 + (tanTheta * tanTheta));
            y = (resultY - ty - sinTheta * x) / cosTheta;
        }

        return TransformationMatrix.fromTranslation(x, y);
    }
}