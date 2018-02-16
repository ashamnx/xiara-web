import { XiaraException } from "@xiara/core";

export class HTTPException extends XiaraException
{
    constructor(public response: string, public statusCode: number)
    {
        super();
    }
};