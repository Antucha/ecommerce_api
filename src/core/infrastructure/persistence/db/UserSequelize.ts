import {ModelRepository} from "../../../common/repository/ModelRepository";
import {UserRepository} from "../../../domain/repository/UserRepository";
import {User} from "../../../domain/models/User";
import {Student} from "../../../domain/models/Student";
import * as sequelize from "sequelize";
import { Op, Sequelize, where } from "sequelize";


export class UserSequelize extends ModelRepository  implements UserRepository{
    public async getById(id: string) {
        return await this.model.findOne({
            where: {
                id: id
            }
        })
    }

    public async getUserByEmailAndRole(email:String, type: String) {
        return await this.model.findOne({
            where: {
                email: email,
                role: type,
                state: 1
            }
        })
    }

}