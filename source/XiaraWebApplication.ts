import { XiaraApplication } from "@xiara/core";
import { WebModuleManager, IWebModuleOptions } from "./WebModule";
import { WebServer } from "./Express";
import { IControllerOptions } from "./Controller";
//import { ControllerRegistry } from "./Controller";

export class XiaraWebApplication extends XiaraApplication
{
    private webserver = new WebServer();
    Controllers: any[] = [];

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
        this.initControllers(AppModule);
        this.initRoutes(AppModule);
    }
    
    protected initRoutes(AppModule)
    {
        let options = this.moduleManager.getModuleOptions<IWebModuleOptions>(AppModule);
        this.webserver.addRoutes((options.routes || []));
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

    getWebServer()
    {
        
        //this.webserver.registerMiddlewares();
        // webserver.registerPolicies();
        // webserver.registerRoutes();
        // webserver.registerCacheControl();
        // webserver.registerControllers();
        // webserver.registerResponses();
        return this.webserver;
    }
};