import { Request, Response } from 'express';
import {AuthenticationFactory} from "../core/application/factory/AuthenticationFactory";
import {SecurityRequest} from "../core/application/request/security/SecurityRequest";
import {ResponseApp} from "../core/common/response/ResponseApp";
import {badRequest} from "boom";
import {SecurityFactory} from "../core/application/factory/SecurityFactory";

export class SecurityController {

    observe (req: Request, res: Response, next) {
        const secFac = new SecurityFactory()
        const result = secFac.validate(new SecurityRequest(req["header"]('Authorization')));
        res["locals"].authorization = result
        next()
    }

    optionalObserve (req: Request, res: Response, next) {
        res["locals"].authorization = null
        if (req["header"]('Authorization')) {
            const secFac = new SecurityFactory()
            const result = secFac.validate(new SecurityRequest(req["header"]('Authorization')));
            res["locals"].authorization = result
        }
        next()
    }
}
