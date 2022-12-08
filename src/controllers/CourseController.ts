import {Request, Response} from "express";
import {ResponseApp} from "../core/common/response/ResponseApp";
import {CourseFactory} from "../core/application/factory/CourseFactory";
import {SecurityFactory} from "../core/application/factory/SecurityFactory";
import {SecurityRequest} from "../core/application/request/security/SecurityRequest";

export class CourseController {

    public async getAll (req: Request, res: Response) {
        const factory = new CourseFactory()
        ResponseApp.response(
            res,
            await factory.getAll(res["locals"].authorization,{page: req["query"].page || 1}),
            'Se obtubo el perfil correctamente'
        )
    }

    public async saveCourse (req: Request, res: Response) {
        const factory = new CourseFactory()
        ResponseApp.response(
            res,
            await factory.saveCourse(res["locals"].authorization,req["body"].data),
            'Se obtubo el perfil correctamente'
        )
    }

    public async update (req: Request, res: Response) {
        const factory = new CourseFactory()
        ResponseApp.response(
            res,
            await factory.update(res["locals"].authorization, req["params"].schoolId,req["body"].data),
            'Se obtubo el perfil correctamente'
        )
    }

    public async delete (req: Request, res: Response) {
        const factory = new CourseFactory()
        ResponseApp.response(
            res,
            await factory.delete(res["locals"].authorization, req["params"].schoolId),
            'Se obtubo el perfil correctamente'
        )
    }
}