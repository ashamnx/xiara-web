import { IMiddlewareOptions } from "./IMiddlewareOptions";
/*
    Defines a Response callback
*/
export function Middleware(middlewareOptions: IMiddlewareOptions = {})
{
    return function(target)
    {
        middlewareOptions.injectables = (middlewareOptions.injectables || []).concat(Reflect.getOwnMetadata("design:paramtypes", target) || []);
        target.metaData = target.metaData || {};
		target.metaData.options = middlewareOptions;
    }
}