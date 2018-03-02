"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function WebModule(options) {
    if (options === void 0) { options = {}; }
    return function (target) {
        target.metaData = {};
        target.metaData.moduleOptions = options;
    };
}
exports.WebModule = WebModule;

//# sourceMappingURL=Decorator.js.map
