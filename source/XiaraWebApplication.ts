import { XiaraApplication } from "@xiara/core";
import { WebModuleManager, IWebModuleOptions } from "./WebModule";
import { WebServer } from "./Express";
import { IControllerOptions } from "./Controller";
import { IResponseOptions } from "./Response";
import { IMiddleware, IMiddlewareOptions } from "./Middleware";
//import { ControllerRegistry } from "./Controller";

export class XiaraWebApplication extends XiaraApplication
{
    private webserver = new WebServer();
    Controllers: any[] = [];
    Responses: any[] = [];
    Middlewares: any[] = [];

    constructor()
    {
        super();
    }

    protected createModuleManager()
    {
        this.moduleManager = new WebModuleManager(this);
    }

    protected initDependencies(AppModule)
    {
        super.initDependencies(AppModule);
        this.initResponses(AppModule);
        this.initMiddlewares(AppModule);
        this.initControllers(AppModule);
        this.initRoutes(AppModule);
    }
    
    protected initRoutes(AppModule)
    {
        let options = this.moduleManager.getModuleOptions<IWebModuleOptions>(AppModule);
        this.webserver.addRoutes((options.routes || []));
    }

    protected initMiddlewares(AppModule)
    {
        let options = this.moduleManager.getModuleOptions<IWebModuleOptions>(AppModule);
		this.Middlewares = (options.middlewares || []).map( ControllerType => this.createMiddleware(ControllerType));
    }

    createMiddleware(MiddlewareType)
    {
        let middleware: IMiddleware = this.componentRegistry.create(MiddlewareType);
        let options = this.componentRegistry.getOptions<IMiddlewareOptions>(MiddlewareType);
        if(middleware.OnRegister)
        {
            middleware.OnRegister(this.webserver);
        }
        
        if(!middleware.handler)
            return;
        if(options.path)
        {
            this.webserver.useOnRoute(options.path, middleware.handler.bind(middleware));
        }else{
            this.webserver.use(middleware.handler.bind(middleware));
        }
        
        return middleware;
    }

    protected initControllers(AppModule)
    {
        let options = this.moduleManager.getModuleOptions<IWebModuleOptions>(AppModule);
		this.Controllers = (options.controllers || []).map( ControllerType => this.createController(ControllerType));
    }
    
    createController(ControllerType)
    {
        let controller = this.componentRegistry.create(ControllerType);
        let options = this.componentRegistry.getOptions<IControllerOptions>(ControllerType);
        this.webserver.useController(controller, options, ControllerType);
        return controller;
    }

    
    protected initResponses(AppModule)
    {
        let options = this.moduleManager.getModuleOptions<IWebModuleOptions>(AppModule);
        this.Responses = (options.responses || []).map( ResponseType => this.createResponse(ResponseType));
    }

    createResponse(ResponseType)
    {
        let response = this.componentRegistry.create(ResponseType);
        let options = this.componentRegistry.getOptions<IResponseOptions>(ResponseType);
        this.webserver.bindResponse(response, options);
        return response;
    }

    getWebServer()
    {
        return this.webserver;
    }
};