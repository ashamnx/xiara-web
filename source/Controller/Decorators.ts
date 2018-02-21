import { IControllerOptions } from "./IControllerOptions";
/*
    Defines a controller
*/
export function Controller(controllerOptions: IControllerOptions = {})
{
    return function(target: any)
    {
        controllerOptions.injectables = (controllerOptions.injectables || []).concat(Reflect.getOwnMetadata("design:paramtypes", target));
		target.metaData = target.metaData || {};
		target.metaData.options = controllerOptions;
    }
}

export function GET(path?: string, policies?: any[])
{
    return createRoute("get", path, policies);
}

export function POST(path?: string, policies?: any[])
{
    return createRoute("post", path, policies);
}

export function PUT(path?: string, policies?: any[])
{
    return createRoute("put", path, policies);
}

export function DELETE(path?: string, policies?: any[])
{
    return createRoute("delete", path, policies);
}

export function PATCH(path?: string, policies?: any[])
{
    return createRoute("patch", path, policies);
}

function createRoute(type, route, policies)
{
    return function(target: any, name: string)
    {
        target.metaData = target.metaData || {};
        target.metaData.routes = target.metaData.routes || []
        target.metaData.routes.push({
            type: type,// Request Method
            target: target, // Target Controller
            method: name, // Target Method
            route: route, // Required Route
            policies: policies, // Required policies
        });     
    }
}