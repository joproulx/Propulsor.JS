import IDrawStyle = require("classes/common/style/IDrawStyle");
import ColorStyle = require("classes/common/style/ColorStyle");

export = FillConfiguration;
class FillConfiguration {
    public Style: IDrawStyle;
    
    constructor () {
        this.Style = ColorStyle.Transparent;
    }
}

