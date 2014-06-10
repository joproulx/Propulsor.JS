define(["require", "exports", "classes/scene/TimeLineController", "classes/common/PolyFill", "classes/scene/Scene"], function(require, exports, TimeLineController, PolyFill, Scene) {
    
    var SceneManager = (function () {
        function SceneManager(startTimestamp, endTimestamp, context) {
            this.DefaultScene = "_DefaultScene_";
            this.m_scenes = {};
            PolyFill();

            this.DefaultScene = "_DefaultScene_";
            this.m_scenes = {};
            this.createScene(this.DefaultScene);

            this.TimeLineController = new TimeLineController(startTimestamp, endTimestamp, context);
            this.TimeLineController.RenderEvent.subscribe(this.onRender, this);
        }
        SceneManager.prototype.createScene = function (name) {
            var scene = new Scene(name);
            this.m_scenes[name] = scene;
            return scene;
        };
        SceneManager.prototype.addToScene = function (sceneElement, sceneName) {
            var scene = this.getScene(sceneName);
            scene.addElement(sceneElement);
        };
        SceneManager.prototype.getScene = function (name) {
            if (name === undefined) {
                name = this.DefaultScene;
            }
            if (!this.m_scenes.hasOwnProperty(name)) {
                return this.createScene(name);
            }
            return this.m_scenes[name];
        };
        SceneManager.prototype.onRender = function (from, t, context, test) {
            from.renderScene.call(from, t, context);
        };
        SceneManager.prototype.renderScene = function (t, context) {
            for (var scene in this.m_scenes) {
                if (this.m_scenes.hasOwnProperty(scene)) {
                    this.m_scenes[scene].render(t, context);
                }
            }
        };
        return SceneManager;
    })();
    return SceneManager;
});
//# sourceMappingURL=SceneManager.js.map
