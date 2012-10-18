define(["require", "exports"], function(require, exports) {
    var Scene = (function () {
        function Scene(name) {
            this.SceneName = name;
            this.m_elements = [];
        }
        Scene.prototype.addElement = function (sceneElement) {
            this.m_elements.push(sceneElement);
        };
        Scene.prototype.render = function (t, context) {
            for(var i = 0; i < this.m_elements.length; i++) {
                this.m_elements[i].render(t, context);
            }
        };
        return Scene;
    })();
    exports.Scene = Scene;    
})

