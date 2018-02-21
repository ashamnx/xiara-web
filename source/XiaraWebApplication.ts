import { XiaraApplication } from "@xiara/core";
import { WebModuleManager, IWebModuleOptions } from "./WebModule";
import { WebServer } from "./Express";
//import { ControllerRegistry } from "./Controller";

export class XiaraWebApplication extends XiaraApplication
{
    constructor()
    {
        super();

        this.createRouter();
    }

    protected createModuleManager()
    {
        this.moduleManager = new WebModuleManager(this);
    }

    protected createRouter()
    {
        console.log("Creating a router?");
    }

    protected initDependencies(AppModule)
    {
        super.initDependencies(AppModule);
        this.initControllers(AppModule);
    }

    protected initControllers(AppModule)
    {
        let options = this.moduleManager.getModuleOptions<IWebModuleOptions>(AppModule);
		(options.controllers || []).map( controller => {
			this.componentRegistry.register(controller);
		});
    }

    createWebServer()
    {
        let webserver = new WebServer();
        webserver.registerMiddlewares();
        webserver.registerPolicies();
        webserver.registerRoutes();
        webserver.registerCacheControl();
        webserver.registerControllers();
        webserver.registerResponses();
        return webserver;
    }
};