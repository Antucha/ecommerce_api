import {StudentRepository} from "../../domain/repository/StudentRepository";
import {UserRepository} from "../../domain/repository/UserRepository";
import {Student} from "../../domain/models/Student";
import {ErrorCustom} from "../../common/error/ErrorCustom";
import {badRequest, notFound, unauthorized} from "boom";

import {AuthInterface} from "../../domain/Entity/AuthInterface";


export class StudentService {

    private repository: StudentRepository


    constructor (
        repository: StudentRepository) {
        this.repository = repository

    }

    async getProfile (auth: AuthInterface, studentId: string) {

        if (!studentId && !auth) {
            ErrorCustom.generate(unauthorized('Peticion no permitido'))
        }

        const StudentEntity:Student = await this.repository.getById((studentId) ? studentId : auth.studentId)

        if (!StudentEntity) {
            ErrorCustom.generate(notFound('No se encontro al estudiante'))
        }

        return {
            id: StudentEntity.id,
            name: StudentEntity.name,
            surnameFather: StudentEntity.surnameFather,
            surnameMother: StudentEntity.surnameMother
        }
    }

}