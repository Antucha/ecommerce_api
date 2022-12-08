import {ModelRepository} from "../../../common/repository/ModelRepository";
import {User} from "../../../domain/models/User";
import {Student} from "../../../domain/models/Student";
import {Course} from "../../../domain/models/Course";
import {CourseRepository} from "../../../domain/repository/CourseRepository";
import * as sequelize from "sequelize";


export class CourseSequelize extends ModelRepository  implements CourseRepository {
    public async getById(courseId: string){
        return  await this.model.findOne({
            where: { id: courseId}
        })
    }

    public async getAll(auth, request){
        return  await this.model.findAll({
            //where: { id: courseId}
        })
    }
}