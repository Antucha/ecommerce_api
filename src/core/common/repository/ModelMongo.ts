import * as mongoose from 'mongoose';
import {DocumentInterface} from "../../infrastructure/persistence/mongo/schema/DocumentInterface";

export abstract class ModelMongo {

    protected model

    constructor (model) {
        // console.log(model.getName())
        // console.log(model.getSchema())
        this.model = mongoose.model(model.getName(), model.getSchema());
    }

    public instance (parameters?) {
        return new this.model(parameters)
    }
}