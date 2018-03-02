"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request = /** @class */ (function () {
    function Request(_req) {
        this._req = _req;
    }
    Object.defineProperty(Request.prototype, "params", {
        get: function () {
            return this._req.params;
        },
        enumerable: true,
        configurable: true
    });
    Request.prototype.getParam = function (key) {
        return this.params[key];
    };
    Object.defineProperty(Request.prototype, "body", {
        get: function () {
            return this._req.body;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "path", {
        get: function () {
            return this._req.path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "method", {
        get: function () {
            return this._req.method;
        },
        enumerable: true,
        configurable: true
    });
    Request.prototype.meta = function (key) {
        return this.metaData[key];
    };
    Request.prototype.setMeta = function (key, value) {
        this.metaData[key] = value;
    };
    return Request;
}());
exports.Request = Request;
;

//# sourceMappingURL=Decorator.js.map
