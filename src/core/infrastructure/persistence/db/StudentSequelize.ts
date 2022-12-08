import {ModelRepository} from "../../../common/repository/ModelRepository";
import {User} from "../../../domain/models/User";
import {Student} from "../../../domain/models/Student";
import {StudentRepository} from "../../../domain/repository/StudentRepository";

export class StudentSequelize extends ModelRepository  implements StudentRepository {

    public async getById(id: string) {
        return  await this.model.findOne({
            where: { id: id},
            include: [ {
                model: User,
                where: {
                    state: '1'
                }
            } ]
        })
    }

    public async getByUserId(userId: string) {
        return  await this.model.findOne({
            where: { userId: userId},
            include: [ {
                model: User,
                where: {
                    state: '1'
                }
            } ]
        })
    }

    public async updateStudentById(id, data){
        return await this.model.update({
            ...data
        },
        {
            where: {
                id: id,
            },
        })
    }

    public async update(student: Student) {
        await student.save()
    }

    async getByEmailAndRole(email: string, role:string) {
        console.log(email)
        const response =  await this.model.findOne({
            include: [ {
                model: User,
                where:{
                    email: email,
                    role:role,
                    state: '1'
                }
            }]
        })

        return response
    }
}
