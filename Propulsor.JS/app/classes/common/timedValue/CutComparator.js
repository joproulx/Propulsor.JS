define(["require", "exports"], function(require, exports) {
    

    var CutComparator = (function () {
        function CutComparator() {
        }
        CutComparator.prototype.compare = function (value1, value2) {
            return value1.compareTo(value2);
        };
        return CutComparator;
    })();
    return CutComparator;
});
//# sourceMappingURL=CutComparator.js.map
