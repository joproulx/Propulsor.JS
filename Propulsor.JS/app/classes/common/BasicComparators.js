define(["require", "exports"], function(require, exports) {
    

    var Booleans = (function () {
        function Booleans() {
        }
        Booleans.prototype.compare = function (value1, value2) {
            if (value1 === value2) {
                return 0;
            }

            if (value1 === true && value2 === false) {
                return 1;
            }

            return -1;
        };
        return Booleans;
    })();

    var Numbers = (function () {
        function Numbers() {
        }
        Numbers.prototype.compare = function (value1, value2) {
            return value1 - value2;
        };
        return Numbers;
    })();

    var BasicComparators = (function () {
        function BasicComparators() {
        }
        BasicComparators.Booleans = new Booleans();
        BasicComparators.Numbers = new Numbers();
        return BasicComparators;
    })();
    return BasicComparators;
});
//# sourceMappingURL=BasicComparators.js.map
