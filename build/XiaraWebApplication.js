"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@xiara/core");
var WebModule_1 = require("./WebModule");
var Express_1 = require("./Express");
//import { ControllerRegistry } from "./Controller";
var XiaraWebApplication = /** @class */ (function (_super) {
    __extends(XiaraWebApplication, _super);
    function XiaraWebApplication() {
        var _this = _super.call(this) || this;
        _this.webserver = new Express_1.WebServer();
        _this.Controllers = [];
        _this.Responses = [];
        _this.Middlewares = [];
        return _this;
    }
    XiaraWebApplication.prototype.createModuleManager = function () {
        this.moduleManager = new WebModule_1.WebModuleManager(this);
    };
    XiaraWebApplication.prototype.initDependencies = function (AppModule) {
        _super.prototype.initDependencies.call(this, AppModule);
        this.initResponses(AppModule);
        this.initMiddlewares(AppModule);
        this.initControllers(AppModule);
        this.initRoutes(AppModule);
    };
    XiaraWebApplication.prototype.initRoutes = function (AppModule) {
        var options = this.moduleManager.getModuleOptions(AppModule);
        this.webserver.addRoutes((options.routes || []));
    };
    XiaraWebApplication.prototype.initMiddlewares = function (AppModule) {
        var _this = this;
        var options = this.moduleManager.getModuleOptions(AppModule);
        this.Middlewares = (options.middlewares || []).map(function (ControllerType) { return _this.createMiddleware(ControllerType); });
    };
    XiaraWebApplication.prototype.createMiddleware = function (MiddlewareType) {
        var middleware = this.componentRegistry.create(MiddlewareType);
        var options = this.componentRegistry.getOptions(MiddlewareType);
        if (middleware.OnRegister) {
            middleware.OnRegister(this.webserver);
        }
        if (!middleware.handler)
            return;
        if (options.path) {
            this.webserver.useOnRoute(options.path, middleware.handler.bind(middleware));
        }
        else {
            this.webserver.use(middleware.handler.bind(middleware));
        }
        return middleware;
    };
    XiaraWebApplication.prototype.initControllers = function (AppModule) {
        var _this = this;
        var options = this.moduleManager.getModuleOptions(AppModule);
        this.Controllers = (options.controllers || []).map(function (ControllerType) { return _this.createController(ControllerType); });
    };
    XiaraWebApplication.prototype.createController = function (ControllerType) {
        var controller = this.componentRegistry.create(ControllerType);
        var options = this.componentRegistry.getOptions(ControllerType);
        this.webserver.useController(controller, options, ControllerType);
        return controller;
    };
    XiaraWebApplication.prototype.initResponses = function (AppModule) {
        var _this = this;
        var options = this.moduleManager.getModuleOptions(AppModule);
        this.Responses = (options.responses || []).map(function (ResponseType) { return _this.createResponse(ResponseType); });
    };
    XiaraWebApplication.prototype.createResponse = function (ResponseType) {
        var response = this.componentRegistry.create(ResponseType);
        var options = this.componentRegistry.getOptions(ResponseType);
        this.webserver.bindResponse(response, options);
        return response;
    };
    XiaraWebApplication.prototype.getWebServer = function () {
        //this.webserver.registerMiddlewares();
        // webserver.registerPolicies();
        // webserver.registerRoutes();
        // webserver.registerCacheControl();
        // webserver.registerControllers();
        // webserver.registerResponses();
        return this.webserver;
    };
    return XiaraWebApplication;
}(core_1.XiaraApplication));
exports.XiaraWebApplication = XiaraWebApplication;
;

//# sourceMappingURL=XiaraWebApplication.js.map
