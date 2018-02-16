import { XiaraApplication, ComponentFactory } from "@xiara/core";
import { WebModule } from "./WebModule";
import { FControllerFactory } from "./ControllerFactory";
import * as express from "express";

export class WebApplication extends XiaraApplication
{
    expressApp: any;

    constructor()
    {
        super();
        this.expressApp = express();
    }

    registerModule(appModule)
    {
        let instance = super.registerModule(appModule);
        instance.controllers = (this.getModuleMeta(appModule, "controllers") || []).map( component => {
			return FControllerFactory.register(component);
        });
        return instance;
    }

    bootstrapModule(bootstrapModule)
    {
        super.bootstrapModule(bootstrapModule);
        this.registerWebComponents();
    }
    
    registerWebComponents()
    {

    }

    listen(target: string | number, hostname?: string)
    {
        // Listen on socket?
        if(!hostname && typeof target === "string")
        {
            this.expressApp
            return this.expressApp.listen(target);
        }

        // listen on port
        this.expressApp.listen(target, hostname);
    }
};