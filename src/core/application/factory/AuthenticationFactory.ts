import {LoginRequest} from "../request/user/LoginRequest";
import {AuthenticationService} from "../services/AuthenticationService";
import {UserSequelize} from "../../infrastructure/persistence/db/UserSequelize";
import {Jwt} from "../../infrastructure/token/Jwt";
import {RegisterRequest} from "../request/user/RegisterRequest";
import {User} from "../../domain/models/User";
import {Student} from "../../domain/models/Student";
import {Author} from "../../domain/models/Author";
import {LoginTimes} from "../../domain/models/LoginTimes";
import {StudentSequelize} from "../../infrastructure/persistence/db/StudentSequelize";
import {AuthorSequelize} from "../../infrastructure/persistence/db/AuthorSequelize";
import {LoginTimesSequelize} from "../../infrastructure/persistence/db/LoginTimesSequelize";

export class AuthenticationFactory {

    private service:AuthenticationService

    constructor () {
        this.service = new AuthenticationService(
            new UserSequelize(User),
            new StudentSequelize(Student),
            new AuthorSequelize(Author),
            new Jwt(),
            new LoginTimesSequelize(LoginTimes)  )
    }

    public async login(request: LoginRequest) {
        return await this.service.login(request)
    }


    public async register(request: RegisterRequest) {
        return await this.service.register(request)
    }

}
