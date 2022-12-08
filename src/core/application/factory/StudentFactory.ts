import {StudentService} from "../services/StudentService";
import {StudentSequelize} from "../../infrastructure/persistence/db/StudentSequelize";
import {UserSequelize} from "../../infrastructure/persistence/db/UserSequelize";
import {Student} from "../../domain/models/Student";
import {User} from "../../domain/models/User";
import {AuthInterface} from "../../domain/Entity/AuthInterface";
import {ConfigApp} from "../../../config/ConfigApp";

import { request } from 'supertest';

export class StudentFactory {

    private service: StudentService

    constructor () {
        this.service = new StudentService(
            new StudentSequelize(Student)
        )
    }

    public async getProfile (auth: AuthInterface, studentId) {
        return await this.service.getProfile(auth, studentId)
    }

    
    public async updateStarOfCourse (auth: AuthInterface, studentId) {
        return await this.service.getProfile(auth, studentId)
    }

}