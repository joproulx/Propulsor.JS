export class Scene {
    SceneName: string;
    private m_elements: any[];

    constructor (name: string) {
        this.SceneName = name;
        this.m_elements = [];
    }
    addElement(sceneElement) {
        this.m_elements.push(sceneElement);
    }
    render(t: number, context: any) {
        for (var i = 0; i < this.m_elements.length; i++) {
            this.m_elements[i].render(t, context);
        }
    }
}