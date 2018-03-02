import { IControllerOptions, IControllerRouting } from "../Controller";
import { IRouteDefinition } from "../Router";
import { IResponseOptions } from "../Response";
export declare class WebServer {
    App: any;
    Controllers: any[];
    constructor();
    use(middleware: any): void;
    useOnRoute(path: string, middleware: any): void;
    static(path: string): void;
    listen(target: number | string, address?: string): void;
    useController(controller: any, options: IControllerOptions, controllerType: any): void;
    getControllerInstance(ControllerType: any): any;
    bindControllerRoutes(router: any, routes: IControllerRouting[], controller: any, startPath?: string): void;
    addRoutes(routes: IRouteDefinition[], startPath?: string): void;
    addRoute(router: any, routeType: string, routePath: any, target: any): void;
    createPolicy(policy: any): any;
    createRouter(routerType: any): void;
    bindResponse(response: any, options: IResponseOptions): void;
}
