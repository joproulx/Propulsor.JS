import ITween = require("classes/common/transition/tween/ITween");
import ITweenController = require("classes/common/transition/tween/ITweenController");

export = ITimedValueConfig; 

interface ITimedValueConfig{
    For?: number;
    Tween?: ITween;
    TweenController?: ITweenController;
}