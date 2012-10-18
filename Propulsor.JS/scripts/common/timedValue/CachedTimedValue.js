define(["require", "exports"], function(require, exports) {
    
    var CachedTimedValue = (function () {
        function CachedTimedValue() {
            this.invalidate();
        }
        CachedTimedValue.prototype.set = function (start, end, value, transition) {
            this.Start = start;
            this.End = end;
            this.Transition = transition;
            this.Value = value;
        };
        CachedTimedValue.prototype.get = function (t) {
            if(this.Start === -1 && this.End === -1) {
                return undefined;
            }
            if(t >= this.Start && (t <= this.End || this.End == -1)) {
                if(this.Transition !== null) {
                    return this.Transition.getValue(t);
                }
                return this.Value;
            }
            return undefined;
        };
        CachedTimedValue.prototype.invalidate = function () {
            this.Start = -1;
            this.End = -1;
            this.Value = null;
            this.Transition = null;
        };
        return CachedTimedValue;
    })();
    exports.CachedTimedValue = CachedTimedValue;    
})

