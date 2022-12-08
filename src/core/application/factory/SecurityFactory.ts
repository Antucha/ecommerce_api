import {SecurityRequest} from "../request/security/SecurityRequest";
import {SecurityService} from "../services/SecurityService";
import {Jwt} from "../../infrastructure/token/Jwt";

export class SecurityFactory {

    private service: SecurityService;

    constructor () {
        this.service = new SecurityService(new Jwt())
    }

    public validate (req: SecurityRequest) {
        return this.service.validate(req)
    }
}