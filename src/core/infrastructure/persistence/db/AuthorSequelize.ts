import {ModelRepository} from "../../../common/repository/ModelRepository";
import {UserRepository} from "../../../domain/repository/UserRepository";
import {User} from "../../../domain/models/User";
import {Author} from "../../../domain/models/Author";
import {AuthorRepository} from "../../../domain/repository/AuthorRepository";




export class AuthorSequelize extends ModelRepository  implements AuthorRepository {

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

    public async updateAuthorById(id, data){
        return await this.model.update({
            ...data
        },
        {
            where: {
                id: id,
            },
        })
    }

    public async update(student: Author) {
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
