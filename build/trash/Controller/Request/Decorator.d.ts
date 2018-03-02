export declare class Request {
    private _req;
    private metaData;
    constructor(_req: any);
    readonly params: {
        [key: string]: any;
    };
    getParam(key: string): any;
    readonly body: any;
    readonly path: string;
    readonly method: string;
    meta(key: string): any;
    setMeta(key: string, value: any): void;
}
