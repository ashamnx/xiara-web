import { IModuleOptions } from "@xiara/core";

export interface IWebModuleOptions extends IModuleOptions
{
    controllers?: any[];
    middlewares?: any[];
    policies?: any[];
    responses?: any[];
};