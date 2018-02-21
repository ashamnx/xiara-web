import * as express from "express";

export class WebServer
{
    App: any;

    constructor()
    {
        this.App = express();
    }

    static(path: string)
    {
        this.App.use(express.static(path));
    }

    listen(target: number | string, address?: string)
    {
        this.App.use("/", (req, res) => {
            res.json({success: true});
        })
        this.App.listen(target, address);
        
    }

};