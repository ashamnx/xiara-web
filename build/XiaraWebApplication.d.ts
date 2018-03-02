import { XiaraApplication } from "@xiara/core";
import { WebServer } from "./Express";
import { IMiddleware } from "./Middleware";
export declare class XiaraWebApplication extends XiaraApplication {
    private webserver;
    Controllers: any[];
    Responses: any[];
    Middlewares: any[];
    constructor();
    protected createModuleManager(): void;
    protected initDependencies(AppModule: any): void;
    protected initRoutes(AppModule: any): void;
    protected initMiddlewares(AppModule: any): void;
    createMiddleware(MiddlewareType: any): IMiddleware;
    protected initControllers(AppModule: any): void;
    createController(ControllerType: any): {};
    protected initResponses(AppModule: any): void;
    createResponse(ResponseType: any): {};
    getWebServer(): WebServer;
}
