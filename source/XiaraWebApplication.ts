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
        this.webserver.bindRoutes((options.routes || []));
    }
    
    protected initControllers(AppModule)
    {
        let options = this.moduleManager.getModuleOptions<IWebModuleOptions>(AppModule);
		this.Controllers = (options.controllers || []).map( ControllerObject => {
            let controller = this.componentRegistry.create(ControllerObject);
            let options = this.componentRegistry.getOptions<IControllerOptions>(ControllerObject);
            this.webserver.useController(controller, options, ControllerObject);
            return controller;
        });
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