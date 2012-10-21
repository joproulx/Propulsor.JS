import TimedValue = module("common/timedValue/TimedValue");
import SceneNode = module("scene/SceneNode");

export class SceneNodePointAdapter extends TimedValue.TimedValue {
    SceneNode: SceneNode.SceneNode;

    constructor (sceneNode: SceneNode.SceneNode) {
        this.SceneNode = sceneNode;
        super(null);
    }
    get(t: number) {
        return this.SceneNode.getPosition(t);
    }
    set(t: number, value: any) {
        return this.SceneNode.setPosition(t, value);
    }
}