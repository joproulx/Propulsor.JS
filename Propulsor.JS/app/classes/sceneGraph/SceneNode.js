define(["require", "exports", "classes/common/TransformationMatrix", "classes/common/timedValue/NumericTimedValue", "classes/common/timedValue/PointTimedValue", "classes/common/Point"], function(require, exports, TransformationMatrix, NumericTimedValue, PointTimedValue, Point) {
    
    var SceneNode = (function () {
        function SceneNode(parentNode) {
            this._relativePosition = undefined;
            this._relativeOrientation = undefined;
            this.ChildNodes = [];

            this._relativePosition = new PointTimedValue(new Point(0, 0));
            this._relativeOrientation = new NumericTimedValue(0);

            parentNode = parentNode === undefined ? null : parentNode;
            if (parentNode !== null) {
                parentNode.addChildSceneNode(this);
            }
        }
        SceneNode.prototype.addChildSceneNode = function (sceneNode) {
            var actualNode = sceneNode;

            this.ChildNodes.push(actualNode);
            actualNode.ParentNode = this;
            actualNode._relativePosition = new PointTimedValue(new Point(0, 0));
            actualNode._relativeOrientation = new NumericTimedValue(0);
        };
        SceneNode.prototype.getParentTransformationMatrix = function (t) {
            if (this.ParentNode === undefined || this.ParentNode === null) {
                return TransformationMatrix.fromArray([
                    [1, 0, 0],
                    [0, 1, 0],
                    [0, 0, 1]
                ]);
            }
            return this.ParentNode.getTransformationMatrix(t);
        };
        SceneNode.prototype.getTransformationMatrix = function (t) {
            var relativePosition = this._relativePosition.get(t);
            var relativeOrientation = this._relativeOrientation.get(t);

            var transformationMatrix = TransformationMatrix.fromTransformation(relativePosition.X, relativePosition.Y, relativeOrientation);

            // TODO: Cache transformation to avoid calculate on each draw
            return this.getParentTransformationMatrix(t).transforms(transformationMatrix);
        };
        SceneNode.prototype.getPosition = function (t) {
            var matrix = this.getTransformationMatrix(t);
            return new Point(matrix.getTranslationX(), matrix.getTranslationY());
        };
        SceneNode.prototype.setAbsolutePosition = function (t, point) {
            // Convert absolute point to relative point
            var translationMatrix = this.getParentTransformationMatrix(t).getRelativeTranslation(point.X, point.Y);
            this._relativePosition.set(t, new Point(translationMatrix.getTranslationX(), translationMatrix.getTranslationY()));
        };
        SceneNode.prototype.setRelativePosition = function (t, point) {
            this._relativePosition.set(t, point);
        };

        //followPathPosition(t: number, path, startRatio: number, endRatio: number) {
        //    this._relativePosition.set(t, undefined, new FollowPathTransition(path, startRatio, endRatio, this));
        //}
        //followPathOrientation(t: number, path: IPath, startRatio: number, endRatio: number) {
        //    this._relativeOrientation.set(t, undefined, new FollowDirectionTransition(path, startRatio, endRatio, this));
        //}
        //followPath(t: number, path: IPath, startRatio: number, endRatio: number) {
        //    this.followPathPosition(t, path, startRatio, endRatio);
        //    this.followPathOrientation(t, path, startRatio, endRatio);
        //}
        SceneNode.prototype.rotate = function (t, radian) {
            this._relativeOrientation.set(t, radian);
        };
        SceneNode.prototype.translate = function (t, dx, dy) {
            this._relativePosition.set(t, new Point(dx, dy));
        };
        SceneNode.prototype.transform = function (t, matrix) {
            var tx = matrix.e(1, 3);
            var ty = matrix.e(2, 3);
            var cosTheta = matrix.e(1, 1);

            this._relativeOrientation.set(t, Math.acos(cosTheta));
            this._relativePosition.set(0, new Point(tx, ty));
        };
        return SceneNode;
    })();
    return SceneNode;
});
//# sourceMappingURL=SceneNode.js.map
