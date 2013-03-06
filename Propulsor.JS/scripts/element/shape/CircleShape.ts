export import EllipseShape = module("element/shape/EllipseShape");

export class CircleShape extends EllipseShape.EllipseShape{
    
    constructor (t: number, radius: number) {
        super(t, radius*2, radius*2);
    }

    setRadius (t: number, radius: number) {
        this.setSize(t, radius*2, radius*2);
    }
}
