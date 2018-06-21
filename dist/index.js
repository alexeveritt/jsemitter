"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JSEmitter = (function () {
    function JSEmitter() {
        this.events = [];
    }
    Object.defineProperty(JSEmitter.prototype, "count", {
        get: function () {
            return this.events ? this.events.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    JSEmitter.prototype.functionCount = function (key) {
        if (!key) {
            throw new Error('Invalid Parameter, key missing');
        }
        var evt = this.findEvent(key);
        if (evt && evt.funcs) {
            return evt.funcs.length;
        }
        return 0;
    };
    JSEmitter.prototype.on = function (key, func) {
        if (!key) {
            throw new Error('Invalid Parameter, key missing');
        }
        return this.addEvent(key, func, 0);
    };
    JSEmitter.prototype.once = function (key, func) {
        if (!key) {
            throw new Error('Invalid Parameter, key missing');
        }
        return this.addEvent(key, func, 1);
    };
    JSEmitter.prototype.many = function (key, func, count) {
        if (!key) {
            throw new Error('Invalid Parameter, key missing');
        }
        return this.addEvent(key, func, count);
    };
    JSEmitter.prototype.emit = function (key, data) {
        if (!key) {
            throw new Error('Invalid Parameter, key missing');
        }
        var evt = this.findEvent(key);
        if (evt) {
            var args = null;
            if (arguments.length > 1) {
                args = [].splice.call(arguments, 0);
                args = args.splice(1);
            }
            for (var i = 0; i < evt.funcs.length; i++) {
                evt.funcs[i].apply(this, args);
            }
            if (evt.count > 0 && --evt.count === 0) {
                this.removeEvents(key);
            }
        }
    };
    JSEmitter.prototype.off = function (key, func) {
        if (!key) {
            throw new Error('Invalid Parameter, key missing');
        }
        this.removeEvents(key, func);
    };
    ;
    JSEmitter.prototype.offAll = function () {
        this.removeEvents();
    };
    ;
    JSEmitter.prototype.offKey = function (key) {
        if (!key) {
            throw new Error('Invalid Parameter, key missing');
        }
        this.removeEvents(key);
    };
    ;
    JSEmitter.prototype.findEvent = function (key) {
        if (!key) {
            throw new Error('Invalid Parameter, key missing');
        }
        var foundItem = { key: '', funcs: [], count: 0 };
        this.events.forEach(function (itm) {
            if (itm.key === key) {
                foundItem = itm;
            }
        });
        return foundItem.key ? foundItem : null;
    };
    JSEmitter.prototype.removeEvents = function (key, func) {
        var evts = this.events;
        if (!key) {
            evts.splice(0, evts.length);
        }
        else {
            if (!func) {
                for (var i = evts.length - 1; i > -1; i--) {
                    if (evts[i].key === key) {
                        evts.splice(i, 1);
                    }
                }
            }
            var evt = this.findEvent(key);
            if (evt) {
                for (var i = evts.length - 1; i > -1; i--) {
                    var funcs = evts[i].funcs;
                    for (var j = funcs.length - 1; j > -1; j--) {
                        if (funcs[i] === func) {
                            funcs.splice(i, 1);
                        }
                    }
                }
            }
        }
        return evts.length;
    };
    ;
    JSEmitter.prototype.addEvent = function (key, func, count) {
        if (!key) {
            throw new Error('Invalid Parameter, key missing');
        }
        var evt = this.findEvent(key);
        if (!evt) {
            evt = { key: key, funcs: [], count: count };
            this.events.push(evt);
        }
        else {
            for (var i = 0; i < evt.funcs.length; i++) {
                if (evt.funcs[i] === func) {
                    return evt.funcs.length;
                }
            }
        }
        evt.funcs.push(func);
        return evt.funcs.length;
    };
    ;
    return JSEmitter;
}());
exports.JSEmitter = JSEmitter;
//# sourceMappingURL=index.js.map