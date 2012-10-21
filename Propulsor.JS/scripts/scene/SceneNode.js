define(["require", "exports", "common/timedValue/TimedValue", "common/TransformationMatrixHelper", "common/timedValue/LinearTimedValue", "common/Point", "transition/PointLinearTransition", "transition/FollowPathTransition", "transition/FollowDirectionTransition"], function(require, exports, __TimedValue__, __TransformationMatrixHelper__, __LinearTimedValue__, __Point__, __PointLinearTransition__, __FollowPathTransition__, __FollowDirectionTransition__) {
    var TimedValue = __TimedValue__;

    var TransformationMatrixHelper = __TransformationMatrixHelper__;

    var LinearTimedValue = __LinearTimedValue__;

    var Point = __Point__;

    var PointLinearTransition = __PointLinearTransition__;

    var FollowPathTransition = __FollowPathTransition__;

    var FollowDirectionTransition = __FollowDirectionTransition__;

    
    var SceneNode = (function () {
        function SceneNode(parentNode) {
            this._relativePosition = undefined;
            this._relativeOrientation = undefined;
            this.ParentNode = parentNode === null ? null : parentNode === undefined ? null : parentNode;
            this.ChildNodes = [];
            this._relativePosition = new TimedValue.TimedValue(function () {
                return new PointLinearTransition.PointLinearTransition();
            });
            this._relativePosition.set(0, new Point.Point(0, 0));
            this._relativeOrientation = new LinearTimedValue.LinearTimedValue(0);
        }
        SceneNode.prototype.addChildSceneNode = function (sceneNode) {
            this.ChildNodes.push(sceneNode);
        };
        SceneNode.prototype.getParentTransformationMatrix = function (t) {
            if(this.ParentNode === undefined || this.ParentNode === null) {
                return $M([
                    [
                        1, 
                        0, 
                        0
                    ], 
                    [
                        0, 
                        1, 
                        0
                    ], 
                    [
                        0, 
                        0, 
                        1
                    ]
                ]);
            }
            return this.ParentNode.getTransformationMatrix(t);
        };
        SceneNode.prototype.getTransformationMatrix = function (t) {
            var relativePosition = this._relativePosition.get(t);
            var relativeOrientation = this._relativeOrientation.get(t);
            var transformationMatrix = TransformationMatrixHelper.getTransformationMatrix(relativeOrientation, relativePosition.X, relativePosition.Y);
            return this.getParentTransformationMatrix(t).x(transformationMatrix);
        };
        SceneNode.prototype.getPosition = function (t) {
            var matrix = this.getTransformationMatrix(t);
            return new Point.Point(TransformationMatrixHelper.getTranslationX(matrix), TransformationMatrixHelper.getTranslationY(matrix));
        };
        SceneNode.prototype.setPosition = function (t, point) {
            var translationMatrix = TransformationMatrixHelper.getTransformationFromPoint(this.getParentTransformationMatrix(t), point.X, point.Y);
            this._relativePosition.set(t, new Point.Point(TransformationMatrixHelper.getTranslationX(translationMatrix), TransformationMatrixHelper.getTranslationY(translationMatrix)));
        };
        SceneNode.prototype.followPathPosition = function (t, path, startRatio, endRatio) {
            this._relativePosition.set(t, undefined, new FollowPathTransition.FollowPathTransition(path, startRatio, endRatio, this));
        };
        SceneNode.prototype.followPathOrientation = function (t, path, startRatio, endRatio) {
            this._relativeOrientation.set(t, undefined, new FollowDirectionTransition.FollowDirectionTransition(path, startRatio, endRatio, this));
        };
        SceneNode.prototype.followPath = function (t, path, startRatio, endRatio) {
            this.followPathPosition(t, path, startRatio, endRatio);
            this.followPathOrientation(t, path, startRatio, endRatio);
        };
        SceneNode.prototype.rotate = function (t, radian) {
            this._relativeOrientation.set(t, radian);
        };
        SceneNode.prototype.translate = function (t, dx, dy) {
            this._relativePosition.set(t, new Point.Point(dx, dy));
        };
        return SceneNode;
    })();
    exports.SceneNode = SceneNode;    
})

