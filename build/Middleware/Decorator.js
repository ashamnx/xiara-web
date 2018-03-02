"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Defines a Response callback
*/
function Middleware(middlewareOptions) {
    if (middlewareOptions === void 0) { middlewareOptions = {}; }
    return function (target) {
        middlewareOptions.injectables = (middlewareOptions.injectables || []).concat(Reflect.getOwnMetadata("design:paramtypes", target) || []);
        target.metaData = target.metaData || {};
        target.metaData.options = middlewareOptions;
    };
}
exports.Middleware = Middleware;

//# sourceMappingURL=Decorator.js.map
