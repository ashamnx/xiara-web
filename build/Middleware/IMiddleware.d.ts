import { WebServer } from "../Express";
export interface IMiddleware {
    OnRegister?(webserver: WebServer): any;
    handler?(req: any, res: any, next: any, ...args: any[]): any;
}
