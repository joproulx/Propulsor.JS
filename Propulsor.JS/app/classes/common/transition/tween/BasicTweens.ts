import ITween = require('classes/common/transition/tween/ITween');
import Tween = require('classes/common/transition/tween/Tween');


export = BasicTweens;
class BasicTweens  {
    public static Linear: ITween = new Tween(function (xRatio: number): number {
        return xRatio;
    });
    
    public static Default: ITween = BasicTweens.Linear;

    
     
    public static EaseIn: ITween = new Tween(function (xRatio: number): number {
        var ratio = BasicTweens.Default.getYRatio(xRatio);
        return -(xRatio) * (xRatio - 2);
    });
} 