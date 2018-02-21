export class Request
{
    private metaData: {[key: string]: any};
    constructor(private _req) {}

    get params(): {[key: string]: any}
    {
        return this._req.params;
    }

    getParam(key: string): any
    {
        return this.params[key];
    }

    get body(): any
    {
        return this._req.body;
    }

    get path(): string
    {
        return this._req.path;
    }

    get method(): string
    {
        return this._req.method;
    }

    meta(key: string)
    {
        return this.metaData[key];
    }

    setMeta(key: string, value: any)
    {
        this.metaData[key] = value;
    }
};