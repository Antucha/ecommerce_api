import {ModelInterface} from "../../domain/repository/ModelInterface";
let nodemailer = require('nodemailer');
import {ModelAws} from "./ModelAws";
const EmailTemplate = require('email-templates');

export abstract class ModelNodeMailer extends ModelAws implements ModelInterface{

    protected model
    protected email


    constructor ({accessKeyId,secretAccessKey, region, email}) {
        super({accessKeyId,secretAccessKey, region})
        this.email = email

        this.model = nodemailer.createTransport({
            SES: this.getSES()
        });
    }

    protected async getTemplate(template, params) {
        const email = new EmailTemplate({
            views: {
                options: {
                    extension: 'ejs' // <---- HERE
                }
            }
        });
        console.log('Current directory: ' + process.cwd());
        console.log('Current directory: ' + __dirname);
        return await email
            .render('/var/task/emails/' + template, params)
    }

    public getEntity () {
        return this.model
    }

}