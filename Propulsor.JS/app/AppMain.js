define(["require", "exports", 'classes/ui/SampleCanvas', 'classes/ui/AccordionControl', 'classes/element/path/Path', 'classes/element/shape/Shape', 'classes/common/Point'], function(require, exports, SampleCanvas, AccordionControl, Path, Shape, Point) {
    var AppMain = (function () {
        function AppMain() {
        }
        AppMain.prototype.run = function () {
            debugger;
            var test = $('#content');
            var accordion = new AccordionControl('demo1', 800, 30, [['background-color', 'gray']]);
            var canvas = new SampleCanvas("Demo #1", "demo1", 5000);
            accordion.addElements([{ Element: canvas.toJQuery(), Title: 'Demo #1' }]);

            var canvas2 = new SampleCanvas("Demo #2", "demo2", 5000);
            accordion.addElements([{ Element: canvas2.toJQuery(), Title: 'Demo #2' }]);

            accordion.toJQuery().appendTo(test);

            //var canvas2 = new SampleCanvas("Demo #2", "demo2", test);
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
            //var shape = new Shape(Path
            //                        .startAt(new Point(300, 200))
            //    .addSegmentTo(new Point(200, 300))
            //    .addSegmentTo(new Point(250, 200))
            //    .close());
            var path = Path.startAt(new Point(300, 200)).addSegmentTo(new Point(200, 300));

            path.setAbsolutePosition(new Point(500, 200), { For: 500 });
            path.setAbsolutePosition(new Point(500, 400), { For: 500 });
            path.setAbsolutePosition(new Point(600, 400), { For: 1500 });

            //var shape = new Shape(Path.generateFrom(path.Joints[0].SceneNode, 0, 3000, 100));
            var shape = new Shape(path);

            //shape.setAbsolutePosition(new Point(500, 200), { At: 3000, Tween: BasicTweens.EaseInQuad });
            //shape.Path.Joints[1].rotate(Math.PI, { For: 3000, Tween: BasicTweens.EaseInQuad, TweenController: BasicTweenControllers.Mirror });
            //shape.Path.Joints[1].rotate(Math.PI * 2, { At: 3000, Tween: BasicTweens.EaseInQuad });
            canvas.addToScene([shape]);
            //var value = new TimedValue(0, BasicInterpolators.Numeric);
            //value.set(5, 12);
            //value.set(5, 10);
            //value.set(10, 13);
            //test.text(value.toString());
            //var path = Path
            //    .startAt(0, new Point(300, 200))
            //    .addSegmentTo(0, new Point(200, 300))
            //    .addSegmentTo(0, new Point(250, 200))
            //path.setAbsolutePosition(3000, new Point(500, 200));
            //path.Joints[0].rotate(3000, Math.PI * 2);
            //path.Joints[1].rotate(3000, Math.PI * 2);
            //var shape = new Shape(Path.generateFrom(path.Joints[2].SceneNode, 0, 3000, 10));
        };
        return AppMain;
    })();
    exports.AppMain = AppMain;
});
//# sourceMappingURL=AppMain.js.map
