import IMovable = require("element/IMovable");
import Segment = require("classes/element/segment/Segment");
import Joint = require("classes/element/joint/Joint");
import Point = require("classes/common/Point");


export = IPath;

interface IPath extends IMovable {
    Segments: Segment[]; // todo: Use only getter if typescript supports it
    Joints: Joint[]; // todo: Use only getter if typescript supports it
    IsClosedPath: boolean;
    length(t: number): number;
    getPointFromRatio(t: number, ratio: number): Point;
    
}