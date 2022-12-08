import {ModelRepository} from "../../../common/repository/ModelRepository";
import {UserRepository} from "../../../domain/repository/UserRepository";
import {User} from "../../../domain/models/User";
import {Student} from "../../../domain/models/Student";
import {StudentRepository} from "../../../domain/repository/StudentRepository";
import {AlertInformationRepository} from "../../../domain/repository/AlertInformationRepository";
import {AlertInformation} from "../../../domain/models/AlertInformation";

export class AlertInformationSequelize extends ModelRepository  implements AlertInformationRepository {
    public async create(alertInformation: AlertInformation) {
        return await this.model.create(JSON.parse(JSON.stringify(alertInformation)))
    }

    update(id: string, state: string) {
    }
}