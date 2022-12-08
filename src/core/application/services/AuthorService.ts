import {AuthorRepository} from "../../domain/repository/AuthorRepository";
import {UserRepository} from "../../domain/repository/UserRepository";
import {Student} from "../../domain/models/Student";
import {Author} from "../../domain/models/Author";
import {ErrorCustom} from "../../common/error/ErrorCustom";
import {badRequest, notFound, unauthorized} from "boom";

import {AuthInterface} from "../../domain/Entity/AuthInterface";


export class AuthorService {

    private repository: AuthorRepository


    constructor (
        repository: AuthorRepository) {
        this.repository = repository

    }

    async getProfile (auth: AuthInterface, authorId?: string) {

        if (!authorId && !auth) {
            ErrorCustom.generate(unauthorized('Peticion no permitido'))
        }

        const AuthorEntity:Author = await this.repository.getById((authorId) ? authorId : auth.authorId)

        if (!AuthorEntity) {
            ErrorCustom.generate(notFound('No se encontro al estudiante'))
        }

        return {
            id: AuthorEntity.id,
            name: AuthorEntity.name,
            surnameFather: AuthorEntity.surnameFather,
            surnameMother: AuthorEntity.surnameMother
        }
    }

}