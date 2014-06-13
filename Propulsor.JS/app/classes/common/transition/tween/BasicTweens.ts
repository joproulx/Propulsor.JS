import ITween = require('classes/common/transition/tween/ITween');
import Tween = require('classes/common/transition/tween/Tween');


// See https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
// Where c=Diff between EndValue and StartValue which is = 1 in our case
//       
//       t/d = xRatio in our case
//         

export = BasicTweens;
class BasicTweens  {
    public static Linear: ITween = new Tween(function (xRatio: number): number {
        return xRatio;
    });
    
    public static Default: ITween = BasicTweens.Linear;

    
     
    public static EaseInQuad: ITween = new Tween(function (xRatio: number): number {
        return xRatio*xRatio;
    });

    public static EaseOutCubic: ITween = new Tween(function (xRatio: number): number {
        return ((xRatio - 1) * xRatio * xRatio + 1);
    });
    
} 