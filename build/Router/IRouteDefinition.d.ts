export interface IRouteDefinition {
    method: "ANY" | "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    path: string;
    controller: any;
    action: string;
    children?: IRouteDefinition[];
    policies?: any[];
    middlewares?: any[];
}
