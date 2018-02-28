import { IResponseOptions } from "./IResponseOptions";
/*
    Defines a Response callback
*/
export function Response(responseOptions: IResponseOptions = {})
{
    return function(target)
    {
        responseOptions.injectables = (responseOptions.injectables || []).concat(Reflect.getOwnMetadata("design:paramtypes", target));
        target.metaData = target.metaData || {};
		target.metaData.options = Object.assign(target.metaData.options, responseOptions);
    }
}