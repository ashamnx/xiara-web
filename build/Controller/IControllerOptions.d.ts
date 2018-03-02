import { IRouter } from "../Router";
import { IComponentOptions } from "@xiara/core";
export interface IControllerRouting {
    method: "ANY" | "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    path: string;
    target: string;
    children?: IControllerRouting[];
    policies?: any[];
}
export interface IControllerOptions extends IComponentOptions {
    path?: string;
    router?: IRouter;
    routes?: IControllerRouting[];
    policies?: any[];
}
