import { IControllerOptions } from "./IControllerOptions";
/*
    Defines a controller
*/
export function Controller(controllerOptions: IControllerOptions = {})
{
    return function(target: any)
    {
        controllerOptions.injectables = (controllerOptions.injectables || []).concat(Reflect.getOwnMetadata("design:paramtypes", target) || []);
		target.metaData = target.metaData || {};
		target.metaData.options = Object.assign(target.metaData.options, controllerOptions);
    }
}

export function ANY(path?: string, policies?: any[])
{
    return createRoute("ANY", path, policies);
}

export function GET(path?: string, policies?: any[])
{
    return createRoute("GET", path, policies);
}

export function POST(path?: string, policies?: any[])
{
    return createRoute("POST", path, policies);
}

export function PUT(path?: string, policies?: any[])
{
    return createRoute("PUT", path, policies);
}

export function DELETE(path?: string, policies?: any[])
{
    return createRoute("DELETE", path, policies);
}

export function PATCH(path?: string, policies?: any[])
{
    return createRoute("PATCH", path, policies);
}

function createRoute(type, route, policies?: any[])
{
    return function(target: any, name: string)
    {
        target.constructor.metaData = target.constructor.metaData || { options: {} };
        let options:IControllerOptions = target.constructor.metaData.options;
        options.routes = options.routes || [];
        options.routes.push({
            method: type,// Request Method
            target: name, // Target Method
            path: route, // Required Route
            policies: policies,
        });
    }
}