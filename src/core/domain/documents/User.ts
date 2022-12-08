import {Specialist} from "./Specialist";

export class User {
    _id
    userReferenceId: string
    name: string
    image: string
    email: string
    confirmed: boolean
    description: string
    username: string
    role:string
    surname: string
    specialist: Specialist
}