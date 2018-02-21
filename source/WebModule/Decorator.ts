import { IWebModuleOptions } from "./IWebModuleOptions";

export function WebModule(options: IWebModuleOptions = {})
{
	return function(target: any)
	{
		target.metaData = {};
		target.metaData.moduleOptions = options;
	}
}
