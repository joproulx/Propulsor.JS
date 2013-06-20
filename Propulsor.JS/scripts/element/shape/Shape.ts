import GuidGenerator = module("common/GuidGenerator");
import IRenderable = module("element/shape/IRenderable");
import LinearTimedValue = module("common/timedValue/LinearTimedValue");
import TimedValue = module("common/timedValue/TimedValue");
import ShapeRenderer = module("element/renderer/ShapeRenderer");
import Path = module("element/path/Path");
import SceneNode = module("sceneGraph/SceneNode");
import Movable = module("element/Movable");
import DrawingStyle = module("element/renderer/drawingContext/DrawingStyle");


export interface IShape extends IRenderable.IRenderable extends SceneNode.IMovable {
    Id: string;
    Path: Path.IPath;
    Renderer: ShapeRenderer.ShapeRenderer;
    Stroke: DrawingStyle.StrokeConfiguration;
    Fill: DrawingStyle.FillConfiguration;
}

export class Shape extends Movable.MovableWrapper implements IShape {
    Id: string;
    Path: Path.IPath;
    Renderer: ShapeRenderer.ShapeRenderer;
    Stroke: DrawingStyle.StrokeConfiguration;
    Fill: DrawingStyle.FillConfiguration;
    
    constructor (path: Path.IPath) {
        super(path);
        this.Id = GuidGenerator.generateGuid();
        this.Renderer = null;
        this.Path = path;
        this.Stroke = new DrawingStyle.StrokeConfiguration();
        this.Fill = new DrawingStyle.FillConfiguration();
    }
    createShapeRenderer() {
        return new ShapeRenderer.ShapeRenderer(this);
    }
    render(t: number, context: any) {
        if (this.Renderer == null) {
            this.Renderer = this.createShapeRenderer();
        }

        this.Renderer.render(t, context);
    }
}