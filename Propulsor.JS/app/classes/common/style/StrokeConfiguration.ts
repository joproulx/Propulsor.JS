import IDrawStyle = require("classes/common/style/IDrawStyle");
import Ratio = require("classes/common/Ratio");
import Dash = require("classes/common/style/Dash");
import LineJoinTypes = require("classes/common/style/LineJoinTypes");
import TimedValue = require("classes/common/timedValue/TimedValue");
import NumericTimedValue = require("classes/common/timedValue/NumericTimedValue");
import ColorStyle = require("classes/common/style/ColorStyle");

export = StrokeConfiguration;
class StrokeConfiguration {
    Style: IDrawStyle;
    Ratio: Ratio;
    Dash: Dash;
    LineWidth: NumericTimedValue;
    LineJoinType: LineJoinTypes;

    constructor() {
        this.Ratio = new Ratio();
        this.Dash = new Dash();
        this.Style = ColorStyle.Black;
        this.LineWidth = new NumericTimedValue(1);
        this.LineJoinType = LineJoinTypes.Miter;
    }
}
