import {ModelInterface} from "./ModelInterface";
import {LoginTimes} from "../models/LoginTimes";

export interface LoginTimesRepository extends ModelInterface{
    create (loginTimes: LoginTimes)
}