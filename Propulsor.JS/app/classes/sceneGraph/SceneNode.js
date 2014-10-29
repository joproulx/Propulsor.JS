define(["require", "exports", "classes/common/TransformationMatrix", "classes/common/timedValue/NumericTimedValue", "classes/common/timedValue/PointTimedValue", "classes/common/Point"], function(require, exports, TransformationMatrix, NumericTimedValue, PointTimedValue, Point) {
    //import FollowPathTransition = require("transition/FollowPathTransition");
    //import FollowDirectionTransition = require("transition/FollowDirectionTransition");
    var CacheMatrix = (function () {
        function CacheMatrix() {
            this._matrix = null;
        }
        CacheMatrix.prototype.getFromCache = function (point, rotation) {
            if (this._matrix === null) {
                return null;
            }

            if (point.X !== this._relativeX || point.Y !== this._relativeY || rotation !== this._relativeRotation) {
                return null;
            }

            return this._matrix;
        };

        CacheMatrix.prototype.cache = function (point, rotation, matrix) {
            this._relativeX = point.X;
            this._relativeY = point.Y;
            this._relativeRotation = rotation;
            this._matrix = matrix;
        };
        return CacheMatrix;
    })();

    var TransformedCacheMatrix = (function () {
        function TransformedCacheMatrix() {
            this._parentMatrix = null;
            this._matrix = null;
        }
        TransformedCacheMatrix.prototype.getFromCache = function (matrix) {
            if (this._matrix === null || this._parentMatrix === null) {
                return null;
            }

            if (!this._parentMatrix.equals(matrix)) {
                return null;
            }

            return this._matrix;
        };

        TransformedCacheMatrix.prototype.cache = function (parentMatrix, matrix) {
            this._parentMatrix = parentMatrix;
            this._matrix = matrix;
        };
        return TransformedCacheMatrix;
    })();

    
    var SceneNode = (function () {
        function SceneNode(parentNode) {
            this._relativePosition = undefined;
            this._relativeOrientation = undefined;
            this._cache = new CacheMatrix();
            this._transformedCache = new TransformedCacheMatrix();
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

            var transformed = false;
            var transformationMatrix = this._cache.getFromCache(relativePosition, relativeOrientation);
            if (transformationMatrix == null) {
                transformationMatrix = TransformationMatrix.fromTransformation(relativePosition.X, relativePosition.Y, relativeOrientation);
                this._cache.cache(relativePosition, relativeOrientation, transformationMatrix);
                transformed = true;
            }

            var parentMatrix = this.getParentTransformationMatrix(t);
            var transformedMatrix = null;

            if (!transformed) {
                transformedMatrix = this._transformedCache.getFromCache(parentMatrix);
            }

            if (transformedMatrix == null) {
                transformedMatrix = parentMatrix.transforms(transformationMatrix);
                this._transformedCache.cache(parentMatrix, transformedMatrix);
            }

            return transformedMatrix;
        };
        SceneNode.prototype.getPosition = function (t) {
            var matrix = this.getTransformationMatrix(t);
            return new Point(matrix.getTranslationX(), matrix.getTranslationY());
        };
        SceneNode.prototype.setAbsolutePosition = function (point, config) {
            var time = (config === undefined || config.For === undefined) ? 0 : config.For;

            // Convert absolute point to relative point
            var translationMatrix = this.getParentTransformationMatrix(time).getRelativeTranslation(point.X, point.Y);
            this._relativePosition.set(new Point(translationMatrix.getTranslationX(), translationMatrix.getTranslationY()), config);
        };
        SceneNode.prototype.setRelativePosition = function (point, config) {
            this._relativePosition.set(point, config);
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
        SceneNode.prototype.rotate = function (radian, config) {
            this._relativeOrientation.set(radian, config);
        };
        SceneNode.prototype.translate = function (dx, dy, config) {
            this._relativePosition.set(new Point(dx, dy), config);
        };
        SceneNode.prototype.transform = function (matrix, config) {
            var tx = matrix.e(1, 3);
            var ty = matrix.e(2, 3);
            var cosTheta = matrix.e(1, 1);

            this._relativeOrientation.set(Math.acos(cosTheta), config);
            this._relativePosition.set(new Point(tx, ty), config);
        };
        return SceneNode;
    })();
    return SceneNode;
});
//# sourceMappingURL=SceneNode.js.map
