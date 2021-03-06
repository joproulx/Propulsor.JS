var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "classes/element/segment/LineSegment", "classes/element/joint/Joint", "classes/element/Movable", "classes/sceneGraph/SceneNode", "classes/common/Point"], function(require, exports, LineSegment, Joint, Movable, SceneNode, Point) {
    
    var Path = (function (_super) {
        __extends(Path, _super);
        function Path(sceneNode, segments, joints, isClosedPath) {
            this.Segments = segments;
            this.Joints = joints;
            this.IsClosedPath = isClosedPath;
            _super.call(this, sceneNode);
        }
        Path.prototype.getLastJoint = function () {
            return _.last(this.Joints);
        };

        Path.prototype.addJoint = function (point, config) {
            var sceneNode = this.SceneNode;
            if (this.Joints.length > 0) {
                // First node is used as a the root scene node
                // TODO: find a better way to set the "root" scene node. Should we have one? Or should we use the first created scene node instead
                //sceneNode = new SceneNode(this.Joints[this.Joints.length-1].SceneNode);
                sceneNode = new SceneNode(this.Joints[0].SceneNode);
            }

            sceneNode.setAbsolutePosition(point, config);
            var joint = new Joint(sceneNode);
            this.Joints.push(joint);
            return joint;
        };

        Path.prototype.addSegment = function (segment, jointStart, jointEnd) {
            segment.setJoints(jointStart, jointEnd);
            jointStart.setSegment2(segment);
            jointEnd.setSegment1(segment);
            this.Segments.push(segment);
            return segment;
        };

        Path.startAt = function (point, config) {
            var path = new Path(new SceneNode(), [], [], false);
            path.addJoint(point, config);
            return path;
        };

        Path.generateFrom = function (sceneNode, startTime, endTime, pointCount) {
            var increment = (endTime - startTime) / pointCount;

            var path = null;
            for (var t = startTime; t <= endTime; t += increment) {
                var point = sceneNode.getPosition(t);

                if (path === null) {
                    path = Path.startAt(point);
                    continue;
                }

                path.addSegmentTo(point);
            }

            return path;
        };

        Path.prototype.addSegmentTo = function (point, config) {
            var path = this;

            if (path.Joints.length === 0) {
                path = Path.startAt(new Point(0, 0), config);
            }

            var jointStart = path.getLastJoint();
            var jointEnd = path.addJoint(point, config);
            path.addSegment(new LineSegment(), jointStart, jointEnd);
            return path;
        };

        Path.prototype.close = function () {
            this.IsClosedPath = true;
            return this;
        };

        Path.prototype.length = function (t) {
            var length = 0;
            for (var i = 0; i < this.Segments.length; i++) {
                length += this.Segments[i].length(t);
            }
            return length;
        };

        Path.prototype.getPointFromRatio = function (t, ratio) {
            var segment = this.getSegmentFromRatio(t, ratio);
            if (segment != null) {
                return segment.Segment.pointFromRatio(t, segment.Ratio);
            }
            return null;
        };

        Path.prototype.getTangentAngleFromRatio = function (t, ratio) {
            var segment = this.getSegmentFromRatio(t, ratio);
            if (segment != null) {
                return segment.Segment.tangentAngleFromRatio(t, segment.Ratio);
            }
            return null;
        };

        Path.prototype.getSegmentFromRatio = function (t, ratio) {
            if (ratio < 0 || ratio > 1) {
                throw "Invalid parameter: ratio. Must be between 0 and 1.";
            }

            var length = this.length(t);
            var currentLength = 0;

            for (var i = 0; i < this.Segments.length; i++) {
                var previousLength = currentLength;

                currentLength += this.Segments[i].length(t);

                var ratio1 = previousLength / length;
                var ratio2 = currentLength / length;

                if (ratio >= ratio1 && ratio <= ratio2) {
                    return {
                        Ratio: (ratio - ratio1) / (ratio2 - ratio1),
                        Segment: this.Segments[i]
                    };
                }
            }
            return null;
        };
        return Path;
    })(Movable);
    return Path;
});
//# sourceMappingURL=Path.js.map
