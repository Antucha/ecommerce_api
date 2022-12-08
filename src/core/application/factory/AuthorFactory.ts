import {AuthorService} from "../services/AuthorService";
import {AuthorSequelize} from "../../infrastructure/persistence/db/AuthorSequelize";
import {UserSequelize} from "../../infrastructure/persistence/db/UserSequelize";
import {Student} from "../../domain/models/Student";
import {User} from "../../domain/models/User";
import {AuthInterface} from "../../domain/Entity/AuthInterface";
import {ConfigApp} from "../../../config/ConfigApp";

import { request } from 'supertest';

export class AuthorFactory {

    private service: AuthorService

    constructor () {
        this.service = new AuthorService(
            new AuthorSequelize(Student)
        )
    }

    public async getProfile (auth: AuthInterface, authorId) {
        return await this.service.getProfile(auth, authorId)
    }

}