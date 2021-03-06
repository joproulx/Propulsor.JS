import TimeLineController = require("classes/scene/TimeLineController");
import PolyFill = require("classes/common/PolyFill");
import Scene = require("classes/scene/Scene");

export = SceneManager;
class SceneManager {
    DefaultScene = "_DefaultScene_";
    m_scenes = {};
    TimeLineController;

    constructor (startTimestamp, endTimestamp, context) {
        PolyFill();

        this.DefaultScene = "_DefaultScene_";
        this.m_scenes = {}
        this.createScene(this.DefaultScene);

        this.TimeLineController = new TimeLineController(startTimestamp, endTimestamp, context);
        this.TimeLineController.RenderEvent.subscribe(this.onRender, this);
    }
    createScene(name) {
        var scene = new Scene(name);
        this.m_scenes[name] = scene;
        return scene;
    }
    addToScene(sceneElement, sceneName) {
        var scene = this.getScene(sceneName);
        scene.addElement(sceneElement);
    }
    getScene(name) {
        if (name === undefined) {
            name = this.DefaultScene;
        }
        if (!this.m_scenes.hasOwnProperty(name)) {
            return this.createScene(name);
        }
        return this.m_scenes[name];
    }
    onRender(from: any, t: any, context: any, test: any) {
        from.renderScene.call(from, t, context);
    }
    renderScene(t, context) {
        for (var scene in this.m_scenes) {
            if (this.m_scenes.hasOwnProperty(scene)) {
                this.m_scenes[scene].render(t, context);
            }
        }
    }
}