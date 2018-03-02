import { IRouter } from "../Router";
import { IPolicy } from "../Policy";
export interface IControllerRouting {
    [key: string]: string;
}
export interface IControllerOptions {
    path?: string;
    router?: IRouter;
    routes: IControllerRouting[];
    policies: IPolicy[];
}
