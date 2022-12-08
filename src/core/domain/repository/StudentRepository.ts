import {User} from "../models/User";
import {Student} from "../models/Student";
import {ModelInterface} from "./ModelInterface";

export interface StudentRepository extends ModelInterface{
    getById(id: string):Student|Promise<Student>
    getByUserId(userId: string)
    updateStudentById(id, data)
    update(student: Student)
    getByEmailAndRole(email: string, role:string)
}