import { WebServer } from "../Express";
export interface IMiddleware
{
    OnRegister?(webserver: WebServer);

    // The middleware handler function
    handler?(req, res, next, ...args: any[]);
};