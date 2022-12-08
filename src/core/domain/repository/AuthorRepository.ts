import {Author} from "../models/Author";
import {ModelInterface} from "./ModelInterface";

export interface AuthorRepository extends ModelInterface{
    getById(id: string):Author|Promise<Author>
    getByUserId(userId: string)
    updateAuthorById(id, data)
    update(student: Author)
    getByEmailAndRole(email: string, role:string)
}