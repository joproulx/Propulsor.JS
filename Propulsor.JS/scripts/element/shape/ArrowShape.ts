import Shape = module("element/shape/Shape");
import PolySegmentShape = module("element/shape/PolySegmentShape");

export class ArrowShape extends PolySegmentShape.PolySegmentShape{
    constructor (t: number) {
        var path = new Shape.JSonPath();
        path.IsClosedPath= true;
        path.Origin = { X: 0, Y: 25 };
        path.Items = [{ X: 0, Y: -25 },
                { SegmentType: "line" },
                { X: 50, Y: 0 },
                { SegmentType: "line" },
                { X: 0, Y: 25 },
                { SegmentType: "line" }];

        super(t, path);
    }
}