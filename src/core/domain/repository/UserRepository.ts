import {User} from "../models/User";
import {ModelInterface} from "./ModelInterface";

export interface UserRepository extends ModelInterface{
    getUserByEmailAndRole(email:String, type: String) : Promise<User>
    getById(id: string): User | Promise<User>
}