
export function getRotationMatrix(rad: number) {
    var costheta = Math.cos(rad);
    var sintheta = Math.sin(rad);

    return $M([
        [costheta, -sintheta, 0],
        [sintheta, costheta, 0],
        [0, 0, 1]
    ]);
}
export function getTranslationMatrix(x: number, y: number) {
    return $M([
        [1, 0, x],
        [0, 1, y],
        [0, 0, 1]
    ]);
}
export function getScaleMatrix(scaleX: number, scaleY: number) {
    return $M([
        [scaleX, 0, 0],
        [0, scaleY, 0],
        [0, 0, 1]
    ]);
}
export function getSkewXMatrix(skewX: number) {
    return $M([
        [1, Math.tan(skewX), 0],
        [0, 1, 0],
        [0, 0, 1]
    ]);
}
export function getSkewYMatrix(skewY: number) {
    return $M([
        [1, 0, 0],
        [Math.tan(skewY), 1, 0],
        [0, 0, 1]
    ]);
}
export function getIdentityMatrix() {
    return $M([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ]);
}
export function getTransformationMatrix(rad: number, tx: number, ty: number) {
    var costheta = Math.cos(rad);
    var sintheta = Math.sin(rad);

    return $M([
        [costheta, -sintheta, tx],
        [sintheta, costheta, ty],
        [0, 0, 1]
    ]);
}
export function getTransformationFromPoint(matrix: any, x: number, y: number) {

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


    var tx = matrix.e(1, 3);
    var ty = matrix.e(2, 3);
    var cosTheta = matrix.e(1, 1);
    var sinTheta = matrix.e(2, 1);
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

    return this.getTranslationMatrix(x, y);
}
export function getRotationRadian(matrix: any) {
    return Math.acos(matrix.e(1, 1));
}
export function getTranslationX(matrix: any) {
    return matrix.e(1, 3);
}
export function getTranslationY(matrix: any) {
    return matrix.e(2, 3);
}

