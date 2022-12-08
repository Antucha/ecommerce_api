import { Request, Response } from 'express';
import {AuthenticationFactory} from "../core/application/factory/AuthenticationFactory";
import {LoginRequest} from "../core/application/request/user/LoginRequest";
import {ResponseApp} from "../core/common/response/ResponseApp";
import {RegisterRequest} from "../core/application/request/user/RegisterRequest";

export class AuthenticationController {

    public async login(req: Request, res: Response) {
        const authFactory = new AuthenticationFactory();
        const response = await authFactory.login(
            new LoginRequest(req["body"].email, req["body"].password, req["body"].role)
        )

        ResponseApp.response(res, response, 'Logged in successfully')
    }

    public async register(req: Request, res: Response) {
        const authFactory = new AuthenticationFactory();
        console.log('req["body"]: ', req["body"])
        const response = await authFactory.register(
            new RegisterRequest(
                req["body"].email,
                req["body"].password,
                req["body"].role,
                req["body"].name,
                req["body"].surnameMother,
                req["body"].surnameFather
            ))

        ResponseApp.response(res, response, 'Register in successfully')
    }

    public async deployTesting(req: Request, res: Response) {
        const response = {message: 'Successfully deploying...'}

        ResponseApp.response(res, response, 'Deploy successfully')
    }
}