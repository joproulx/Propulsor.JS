import ITween = require("classes/common/transition/tween/ITween");

export = ITweenController; 

interface ITweenController {
    getYRatio(xRatio: number, tween: ITween): number;
}