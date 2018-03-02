import { IModuleOptions } from "@xiara/core";
import { IRouteDefinition } from "../Router";
export interface IWebModuleOptions extends IModuleOptions {
    controllers?: any[];
    middlewares?: any[];
    policies?: any[];
    responses?: any[];
    routes?: IRouteDefinition[];
}
