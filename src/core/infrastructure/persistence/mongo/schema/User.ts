import * as mongoose from 'mongoose';
// import {Specialist} from "./Specialist";
import {DocumentInterface} from "./DocumentInterface";

export class User{
    public static schema;

    static getName () {
        return User.name
    }

    static getSchema () {
        if (!User.schema) {
            User.schema = new mongoose.Schema({
                // id: {
                //     type: mongoose.Types.ObjectId()
                // },
                userReferenceId: {
                    type: String,
                    required: 'User relational id'
                },
                name: {
                    type: String
                },
                username: {
                    type: String
                },
                email: {
                    type: String
                },
                role: {
                    type: String
                },
                surname: {
                    type: String
                },
                image: {
                    type: Number
                },
                confirmed: {
                    type: Boolean
                },
                description: {
                    type: Number
                }
                // specialist: Specialist
            });
        }
        User.schema.index({userReferenceId: 1, username: 1, email:1}, {unique: true});
        // Specialist.index({nickname:1})
        return User.schema
    }
}