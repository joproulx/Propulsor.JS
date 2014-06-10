define(["require", "exports"], function(require, exports) {
    function generateGuid() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    exports.generateGuid = generateGuid;
});
//# sourceMappingURL=GuidGenerator.js.map
