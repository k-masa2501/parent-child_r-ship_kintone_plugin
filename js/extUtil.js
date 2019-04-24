module.exports = (function(){
      // objectの拡張
      if (!Array.prototype.findIndex){
        Object.defineProperty(Array.prototype, 'findIndex', {
          value: function(fn, self) {
            if (this === null) {
              throw new TypeError('Array.prototype.findIndex called on null or undefined');
            }
            if (typeof fn !== 'function') {
              throw new TypeError('fn must be a function');
            }

            self = self || this;
            var list = Object(this);
            var length = list.length >>> 0;
            var value;
        
            for (var i = 0; i < length; i++) {
              value = list[i];
              if (fn.call(self, value, i, list)) {
                return i;
              }
            }
            return -1;
          }
        });
      }

      Object.defineProperty(Object.prototype, "forIn", {
        value: function(fn, self) {
          if (this === null) {
            throw new TypeError('Object.prototype.forIn called on null or undefined');
          }
          if (typeof fn !== 'function') {
            throw new TypeError('fn must be a function');
          }

            self = self || this;
    
            Object.keys(this).forEach(function(key, index) {
                var value = this[key];
    
                fn.call(self, key, value, index);
            }, this);
        }
    });
})()