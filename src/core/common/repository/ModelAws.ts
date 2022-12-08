import {ModelInterface} from "../../domain/repository/ModelInterface";


export abstract class ModelAws implements ModelInterface{

    protected client


    constructor ({accessKeyId,secretAccessKey, region}) {
        this.client = require('aws-sdk');
        this.client.config.update({
            "accessKeyId": accessKeyId,
            "secretAccessKey": secretAccessKey,
            "region": region
        });
    }

    protected getSNS (): any {
        return new this.client.SNS()
    }

    protected getSES (): any {
        return new this.client.SES({
            apiVersion: '2010-12-01'
        })
    }

    public getEntity () {
        return this.client
    }

}