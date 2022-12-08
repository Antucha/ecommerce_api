//<reference path="../node_modules/@types/mongoose/index.d.ts"/>
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/Routes";
import * as cors from 'cors';
import * as mongoose from "mongoose";

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'base de datos mongo';

    constructor() {
        this.app = express();
        // this.app["use"]('/institution/v1', Routes);
        this.config();
        // this.mongoSetup()
        this.routePrv.routes(this.app);
        this.routePrv.routes.bind(() => {
            console.log('bind bind')
        });
        this.app["use"]('/services', this.routePrv.routes);
    }

    private config(): void {
        // support application/json type post data
        this.app["use"](bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app["use"](bodyParser.urlencoded({ extended: false }));
        this.app["use"](cors({origin: '*'}));
    }

    // private mongoSetup(): void{
    //     (<any>mongoose).Promise = global.Promise;
    //     mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    // }
}

export default new App().app;