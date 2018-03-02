"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var routeFnMap = {
    ANY: "use",
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
    PATCH: "patch"
};
var WebServer = /** @class */ (function () {
    function WebServer() {
        this.Controllers = [];
        this.App = express();
    }
    WebServer.prototype.use = function (middleware) {
        this.App.use(middleware);
    };
    WebServer.prototype.useOnRoute = function (path, middleware) {
        this.App.use(path, middleware);
    };
    WebServer.prototype.static = function (path) {
        this.App.use(express.static(path));
    };
    WebServer.prototype.listen = function (target, address) {
        this.App.listen(target, address);
    };
    WebServer.prototype.useController = function (controller, options, controllerType) {
        this.Controllers[controllerType] = controller;
        // if(options.router)
        // {
        //     let router = this.createRouter(options.router);
        //     this.App.use(options.path, options.router);
        // }
        if (options.path) {
            var router = express.Router();
            this.bindControllerRoutes(router, (options.routes || []), controller);
            var policies = options.policies || [];
            for (var _i = 0, policies_1 = policies; _i < policies_1.length; _i++) {
                var policy = policies_1[_i];
                var policyInstance = this.createPolicy(policy);
                this.App.use(options.path, policyInstance.verify.bind(policyInstance));
            }
            this.App.use(options.path, router);
        }
    };
    WebServer.prototype.getControllerInstance = function (ControllerType) {
        return this.Controllers[ControllerType];
    };
    WebServer.prototype.bindControllerRoutes = function (router, routes, controller, startPath) {
        if (startPath === void 0) { startPath = ""; }
        for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
            var route = routes_1[_i];
            var policies = route.policies || [];
            for (var _a = 0, policies_2 = policies; _a < policies_2.length; _a++) {
                var policy = policies_2[_a];
                var policyInstance = this.createPolicy(policy);
                this.addRoute(router, route.method, startPath + route.path, policyInstance.verify.bind(policyInstance));
            }
            this.addRoute(router, route.method, startPath + route.path, controller[route.target].bind(controller));
            // Bind child routes
            this.bindControllerRoutes(router, route.children || [], controller, startPath + route.path);
        }
    };
    WebServer.prototype.addRoutes = function (routes, startPath) {
        if (startPath === void 0) { startPath = ""; }
        for (var _i = 0, routes_2 = routes; _i < routes_2.length; _i++) {
            var route = routes_2[_i];
            var controller = this.getControllerInstance(route.controller);
            var policies = route.policies || [];
            for (var _a = 0, policies_3 = policies; _a < policies_3.length; _a++) {
                var policy = policies_3[_a];
                var policyInstance = this.createPolicy(policy);
                this.addRoute(this.App, route.method, startPath + route.path, policyInstance.verify.bind(policyInstance));
            }
            this.addRoute(this.App, route.method, startPath + route.path, controller[route.action].bind(controller));
            this.addRoutes((route.children || []), startPath + route.path);
        }
    };
    WebServer.prototype.addRoute = function (router, routeType, routePath, target) {
        var method = routeFnMap[routeType];
        if (!method)
            throw new Error("Invalid method '" + routeType + "' for route: '" + routePath + "'");
        router[method](routePath, target);
    };
    WebServer.prototype.createPolicy = function (policy) {
        return new policy(this);
    };
    WebServer.prototype.createRouter = function (routerType) {
        var router = express.Router();
    };
    WebServer.prototype.bindResponse = function (response, options) {
        this.App.use(function (req, res, next) {
            res[options.name] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                response.send.apply(response, [req, res].concat(args));
            };
            next();
        });
    };
    return WebServer;
}());
exports.WebServer = WebServer;
;

//# sourceMappingURL=WebServer.js.map
