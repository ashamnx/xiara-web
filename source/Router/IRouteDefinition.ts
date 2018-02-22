export interface IRouteDefinition
{
    // Request Method 
    method: "ANY" | "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

    // Path to use for this route
    path: string;

    // Target controller
    controller: any;

    // Target Method on the controller
    action: string;

    // Child paths
    children?: IRouteDefinition[];

    // Policies
    policies?: any[];

    // Middlewares
    middlewares?: any[];
};
