import GuidGenerator = require("classes/common/GuidGenerator");
import StrokeConfiguration = require("classes/common/style/StrokeConfiguration");
import FillConfiguration = require("classes/common/style/FillConfiguration");
import IRenderable = require("classes/element/shape/IRenderable");
import TimedValue = require("classes/common/timedValue/TimedValue");
import ShapeRenderer = require("classes/element/renderer/ShapeRenderer");
import IPath = require("classes/element/path/IPath");
import IShape = require("classes/element/shape/IShape");
import Path = require("classes/element/path/Path");
import SceneNode = require("classes/sceneGraph/SceneNode");
import Movable = require("classes/element/Movable");
import MovableWrapper = require("classes/element/MovableWrapper");

export = Shape;
class Shape extends MovableWrapper implements IShape {
    public Id: string;
    public Path: IPath;
    public Renderer: ShapeRenderer;
    public Stroke: StrokeConfiguration;
    public Fill: FillConfiguration;
    
    constructor (path: IPath) {
        super(path);
        this.Id = GuidGenerator.generateGuid();
        this.Renderer = null;
        this.Path = path;
        this.Stroke = new StrokeConfiguration();
        this.Fill = new FillConfiguration();
    }
    public createShapeRenderer() {
        return new ShapeRenderer(this);
    }
    public render(t: number, context: any) {
        if (this.Renderer == null) {
            this.Renderer = this.createShapeRenderer();
        }

        this.Renderer.render(t, context);
    }
}