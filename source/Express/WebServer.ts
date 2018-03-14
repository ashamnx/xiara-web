import * as express from "express";
import { Injectable } from "@xiara/core";
import { IControllerOptions, IControllerRouting } from "../Controller";
import { IRouter, IRouteDefinition } from "../Router";
import { IResponseOptions } from "../Response";

const routeFnMap = {
    ANY: "use",
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
    PATCH: "patch"
};

@Injectable()
export class WebServer
{
    App: any;
    Controllers = [];

    constructor()
    {
		console.log("Creating express app");
        this.App = express();
    }

    use(middleware: any)
    {
        this.App.use(middleware);
    }

    useOnRoute(path:string, middleware: any)
    {
        this.App.use(path, middleware);
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
        // if(options.router)
        // {
        //     let router = this.createRouter(options.router);
        //     this.App.use(options.path, options.router);
        // }
        
        if(options.path)
        {
            let router = express.Router();
            this.bindControllerRoutes(router, (options.routes || []), controller);
            let policies = options.policies || [];
            for(let policy of policies)
            {
                let policyInstance = this.createPolicy(policy);
                this.App.use(options.path, policyInstance.verify.bind(policyInstance));
            }
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
            let policies = route.policies || [];
            for(let policy of policies)
            {
                let policyInstance = this.createPolicy(policy);
                this.addRoute(router, route.method, startPath + route.path, policyInstance.verify.bind(policyInstance));
            }
            this.addRoute(router, route.method, startPath + route.path, controller[route.target].bind(controller));
            // Bind child routes
            this.bindControllerRoutes(router, route.children || [], controller, startPath + route.path);
        }
    }

    addRoutes(routes: IRouteDefinition[], startPath = "")
    {
        for(let route of routes)
        {
            let controller = this.getControllerInstance(route.controller);
            let policies = route.policies || [];
            for(let policy of policies)
            {
                let policyInstance = this.createPolicy(policy);
                this.addRoute(this.App, route.method, startPath + route.path, policyInstance.verify.bind(policyInstance));
            }
            this.addRoute(this.App, route.method, startPath + route.path, controller[route.action].bind(controller));
            this.addRoutes((route.children || []), startPath + route.path);
        }
        
    }

    addRoute(router, routeType:string, routePath: any, target)
    {
        let method = routeFnMap[routeType];
        if(!method)
            throw new Error("Invalid method '" + routeType + "' for route: '" + routePath + "'");
        router[method](routePath, target);
    }

    createPolicy(policy)
    {
        return new policy(this);
    }

    createRouter(routerType: any)
    {
        let router = express.Router();
    }

    bindResponse(response, options: IResponseOptions)
    {
        this.App.use((req, res, next) => {
            res[options.name] = (...args:any[]) => {
                response.send.apply(response, [req, res].concat(args));
            }
            next();
        })
    }
};