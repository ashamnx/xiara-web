import * as express from "express";
import { IControllerOptions, IControllerRouting } from "../Controller";
import { IRouter, IRouteDefinition } from "../Router";

const routeFnMap = {
    ANY: "use",
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
    PATCH: "patch"
};

export class WebServer
{
    App: any;
    Controllers = [];

    constructor()
    {
        this.App = express();
    }

    static(path: string)
    {
        this.App.use(express.static(path));
    }

    listen(target: number | string, address?: string)
    {
        this.App.listen(target, address);
    }

    useController(controller:any, options: IControllerOptions, controllerType: any)
    {
        this.Controllers[controllerType] = controller;
        if(options.router)
        {
            let router = this.createRouter(options.router);
            this.App.use(options.path, options.router);
        }
        
        if(options.path)
        {
            let router = express.Router();
            this.bindControllerRoutes(router, (options.routes || []), controller);
            this.App.use(options.path, router);
        }
    }

    getControllerInstance(ControllerType)
    {
        return this.Controllers[ControllerType];
    }
    
    bindControllerRoutes(router, routes:IControllerRouting[], controller: any, startPath = "")
    {
        for(let route of routes)
        {
            this.addRoute(router, route.method, startPath + route.path, controller[route.target].bind(controller));
            
            // Bind child routes
            this.bindControllerRoutes(router, route.children || [], controller, startPath + route.path);
        }
    }

    bindRoutes(routes: IRouteDefinition[], startPath = "")
    {
        for(let route of routes)
        {
            let controller = this.getControllerInstance(route.controller);
            this.addRoute(this.App, route.method, startPath + route.path, controller[route.action].bind(controller));
            this.bindRoutes((route.children || []), startPath + route.path);
        }
        
    }

    addRoute(router, routeType:string, routePath: any, target)
    {
        let method = routeFnMap[routeType];
        if(!method)
            throw new Error("Invalid method '" + routeType + "' for route: '" + routePath + "'");
        router[method](routePath, target);
    }

    createRouter(routerType: any)
    {
        let router = express.Router();
    }
};