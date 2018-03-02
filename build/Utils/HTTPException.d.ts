import { XiaraException } from "@xiara/core";
export declare class HTTPException extends XiaraException {
    response: string;
    statusCode: number;
    constructor(response: string, statusCode: number);
}
