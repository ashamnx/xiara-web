"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Defines a controller
*/
function Controller(controllerOptions) {
    if (controllerOptions === void 0) { controllerOptions = {}; }
    return function (target) {
        controllerOptions.injectables = (controllerOptions.injectables || []).concat(Reflect.getOwnMetadata("design:paramtypes", target) || []);
        target.metaData = target.metaData || {};
        target.metaData.options = Object.assign(target.metaData.options, controllerOptions);
    };
}
exports.Controller = Controller;
function ANY(path, policies) {
    return createRoute("ANY", path, policies);
}
exports.ANY = ANY;
function GET(path, policies) {
    return createRoute("GET", path, policies);
}
exports.GET = GET;
function POST(path, policies) {
    return createRoute("POST", path, policies);
}
exports.POST = POST;
function PUT(path, policies) {
    return createRoute("PUT", path, policies);
}
exports.PUT = PUT;
function DELETE(path, policies) {
    return createRoute("DELETE", path, policies);
}
exports.DELETE = DELETE;
function PATCH(path, policies) {
    return createRoute("PATCH", path, policies);
}
exports.PATCH = PATCH;
function createRoute(type, route, policies) {
    return function (target, name) {
        target.constructor.metaData = target.constructor.metaData || { options: {} };
        var options = target.constructor.metaData.options;
        options.routes = options.routes || [];
        options.routes.push({
            method: type,
            target: name,
            path: route,
            policies: policies,
        });
    };
}

//# sourceMappingURL=Decorators.js.map
