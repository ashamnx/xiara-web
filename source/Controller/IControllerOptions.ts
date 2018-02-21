//import { IRouter } from "../Router";
//import { IPolicy } from "../Policy";
import { IComponentOptions } from "@xiara/core";

export interface IControllerRouting
{
    [key: string]: string;
};

export interface IControllerOptions extends IComponentOptions
{
    // Creates a new router with the defined path for this controller
    path?: string;
    
//    // Uses an existing router to access this controller
  //  router?: IRouter;

    // Override routes for this controller
    //routes:  IControllerRouting[];

//    // Policies to apply to this controller
  //  policies: IPolicy[];
};