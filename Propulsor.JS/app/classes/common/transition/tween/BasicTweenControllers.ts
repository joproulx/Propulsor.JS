import ITween = require('classes/common/transition/tween/ITween');
import ITweenController = require('classes/common/transition/tween/ITweenController');


class DefaultController implements ITweenController {
    public getYRatio(xRatio: number, tween: ITween): number {
        return tween.getYRatio(xRatio);
    }
}
export = BasicTweenControllers
class BasicTweenControllers {
    public static Default: ITweenController = new DefaultController();
}  
