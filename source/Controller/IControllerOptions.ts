import { IRouter } from "../Router";
//import { IPolicy } from "../Policy";
import { IComponentOptions } from "@xiara/core";

export interface IControllerRouting
{
    // Request Method 
    method: "ANY" | "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

    // Path to use for this route
    path: string;

    // Target Method on the controller
    target: string;

    // Child paths
    children?: IControllerRouting[];
};

export interface IControllerOptions extends IComponentOptions
{
    // Creates a new router with the defined path for this controller
    path?: string;
    
    // Uses an existing router to access this controller
    router?: IRouter;

    // Override routes for this controller
    routes?: IControllerRouting[];

//    // Policies to apply to this controller
  //  policies: IPolicy[];
};