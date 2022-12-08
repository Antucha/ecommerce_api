import {ModelInterface} from "../../domain/repository/ModelInterface";
import axios from 'axios';


export abstract class ModelHttp implements ModelInterface{

    protected model
    protected authorization

    constructor ({url, authorization = null || {value: null, key: null} }) {

        this.authorization = authorization

        this.model = axios.create({
            baseURL: url
        })

        if (authorization) {
            this.model.interceptors.request.use(
                config => {
                    // Do something before request is sent

                    config.headers[authorization.key] = authorization.value;
                    return config;
                },
                error => {
                    Promise.reject(error);
                }
            );
        }
    }

    public getEntity () {
        return this.model
    }

}