import { ModuleManager } from "@xiara/core";
import { IWebModuleOptions } from "./IWebModuleOptions";
import { XiaraWebApplication } from "../XiaraWebApplication";

export class WebModuleManager extends ModuleManager
{
    constructor(app: XiaraWebApplication)
    {
        super(app);
        console.log("WebModule manager loaded");
    }
};