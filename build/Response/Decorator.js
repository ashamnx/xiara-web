"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Defines a Response callback
*/
function Response(responseOptions) {
    return function (target) {
        responseOptions.injectables = (responseOptions.injectables || []).concat(Reflect.getOwnMetadata("design:paramtypes", target) || []);
        target.metaData = target.metaData || {};
        target.metaData.options = responseOptions;
    };
}
exports.Response = Response;

//# sourceMappingURL=Decorator.js.map
