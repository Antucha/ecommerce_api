import {User} from "../models/User";
import {Student} from "../models/Student";
import {ModelInterface} from "./ModelInterface";
import {AlertInformation} from "../models/AlertInformation";

export interface AlertInformationRepository extends ModelInterface{
    create(alertInformation: AlertInformation)
    update(id:string, state:string)
}