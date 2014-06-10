
import SampleCanvas = require('classes/ui/SampleCanvas');
import SceneNode = require('classes/sceneGraph/SceneNode');
import TimedValue = require('classes/common/timedValue/TimedValue');
import BasicInterpolators = require('classes/common/transition/interpolation/BasicInterpolators');
import Path = require('classes/element/path/Path');
import Shape = require('classes/element/shape/Shape');
import Point = require('classes/common/Point');

export class AppMain {
    public run() {

        var test = $('#content');

        var canvas = new SampleCanvas("test1", test);

        //var root = new SceneNode();
        //var child1 = new SceneNode(root);

        //child1.setRelativePosition(0, new Point(100, 0));
        //child1.rotate(5000, 2 * Math.PI);

        //var child2 = new SceneNode(child1);
        //child2.setRelativePosition(0, new Point(100, 0));
        //child2.rotate(5000, 2 * Math.PI);
        
        //root.setAbsolutePosition(0, new Point(300, 300));
        //root.rotate(5000, 2 * Math.PI);

        //var shape = new Shape(Path.generateFrom(child2, 0, 3000, 10));
        
        var shape = new Shape(Path
                                .startAt(0, new Point(100, 200))
                                .addSegmentTo(0, new Point(200, 200)));

        shape.setAbsolutePosition(3000, new Point(200, 200));

        canvas.addToScene([shape]);

        //var value = new TimedValue(0, BasicInterpolators.Numeric);
        //value.set(5, 12);
        //value.set(5, 10);
        //value.set(10, 13);
        
        //test.text(value.toString());


    }
} 