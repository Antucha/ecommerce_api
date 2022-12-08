import {ModelInterface} from "../../domain/repository/ModelInterface";
import {Twilio} from 'twilio';


export abstract class ModelTwillio implements ModelInterface{

    protected model
    protected phone


    constructor ({accountSid,authToken, phone}) {
        this.model = new Twilio(accountSid, authToken);
        this.phone = phone
    }

    public getEntity () {
        return this.model
    }

}