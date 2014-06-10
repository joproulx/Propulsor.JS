import IRenderable = require("element/shape/IRenderable");
import ShapeRenderer = require("classes/element/renderer/ShapeRenderer");
import IPath = require("classes/element/path/IPath");
import StrokeConfiguration = require("classes/common/style/StrokeConfiguration");
import FillConfiguration = require("classes/common/style/FillConfiguration");
import IMovable = require("classes/element/IMovable");

export = IShape;
interface IShape extends IRenderable, IMovable {
    Id: string;
    Path: IPath;
    Renderer: ShapeRenderer;
    Stroke: StrokeConfiguration;
    Fill: FillConfiguration;
}
