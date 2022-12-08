import {Request, Response} from "express";
import {ResponseApp} from "../core/common/response/ResponseApp";
import {StudentFactory} from "../core/application/factory/StudentFactory";

export class StudentController {
    public async getProfile (req: Request, res: Response) {
        const factory = new StudentFactory()
        ResponseApp.response(
            res,
            await factory.getProfile(res["locals"].authorization, req["params"].studentId),
            'Se obtubo el perfil correctamente'
        )
    }

    public async updateStarOfCourse (req: Request, res: Response) {
        const factory = new StudentFactory()
        ResponseApp.response(
            res,
            await factory.getProfile(res["locals"].authorization, req["params"].studentId),
            'Se obtubo el perfil correctamente'
        )
    }
}