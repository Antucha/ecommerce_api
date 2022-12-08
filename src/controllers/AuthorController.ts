import {Request, Response} from "express";
import {ResponseApp} from "../core/common/response/ResponseApp";
import {AuthorFactory} from "../core/application/factory/AuthorFactory";

export class AuthorController {
    public async getProfile (req: Request, res: Response) {
        const factory = new AuthorFactory()
        ResponseApp.response(
            res,
            await factory.getProfile(res["locals"].authorization, req["params"].studentId),
            'Se obtubo el perfil correctamente'
        )
    }
}