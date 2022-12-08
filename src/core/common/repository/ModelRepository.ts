import {ModelInterface} from "../../domain/repository/ModelInterface";
import {Student} from "../../domain/models/Student";

export abstract class ModelRepository implements ModelInterface{

    protected model

    constructor (model) {
        this.model = model
    }

    public getEntity () {
        return this.model
    }

}