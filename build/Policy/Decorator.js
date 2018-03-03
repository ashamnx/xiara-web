"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Policy(policyOptions) {
    if (policyOptions === void 0) { policyOptions = {}; }
    return function (target) {
        policyOptions.injectables = (policyOptions.injectables || []).concat(Reflect.getOwnMetadata("design:paramtypes", target) || []);
        target.metaData = target.metaData || {};
        target.metaData.options = Object.assign(target.metaData.options, policyOptions);
    };
}
exports.Policy = Policy;

//# sourceMappingURL=Decorator.js.map
