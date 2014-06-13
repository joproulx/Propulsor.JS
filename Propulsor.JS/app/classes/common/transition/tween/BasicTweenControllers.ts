import ITween = require('classes/common/transition/tween/ITween');
import ITweenController = require('classes/common/transition/tween/ITweenController');


class DefaultController implements ITweenController {
    public getYRatio(xRatio: number, tween: ITween): number {
        return tween.getYRatio(xRatio);
    }
}

class MirrorController implements ITweenController {
    public getYRatio(xRatio: number, tween: ITween): number {
        if (xRatio <= 0.5) {
            return tween.getYRatio(xRatio * 2);
        }

        return tween.getYRatio((1 - xRatio) * 2);
    }
}
export = BasicTweenControllers
class BasicTweenControllers {
    public static Default: ITweenController = new DefaultController();

    public static Mirror: ITweenController = new MirrorController();
}  
