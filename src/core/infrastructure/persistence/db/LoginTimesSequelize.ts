import {ModelRepository} from "../../../common/repository/ModelRepository";
import * as sequelize from "sequelize";
import {LoginTimesRepository} from "../../../domain/repository/LoginTimesRepository";
import {LoginTimes} from "../../../domain/models/LoginTimes";


export class LoginTimesSequelize extends ModelRepository  implements LoginTimesRepository{

    async create(loginTimes: LoginTimes) {
        await this.model.create(JSON.parse(JSON.stringify(loginTimes)))
    }

}