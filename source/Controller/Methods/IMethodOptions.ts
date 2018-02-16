import { IController } from "source/Controller";
import { IPolicy } from "../../Policy";


export interface IMethodOptions
{
    // Policies to apply to this controller
    policies: IPolicy[];
};