import { IPolicyOptions } from "./IPolicyOptions";

export function Policy(policyOptions: IPolicyOptions = {})
{
    return function(target: any)
    {
        policyOptions.injectables = (policyOptions.injectables || []).concat(Reflect.getOwnMetadata("design:paramtypes", target) || []);
		target.metaData = target.metaData || {};
		target.metaData.options = policyOptions;
    }
}