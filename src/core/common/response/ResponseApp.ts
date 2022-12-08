import { Request, Response } from 'express';
import {ErrorCustom} from "../error/ErrorCustom";
import {internal} from "boom";

export class ResponseApp {

    static SUCCESS = 200

    public static response(res, result?, message?) {
        let resultData:any
        let code

        if (result) {

            code = ((result.output !== undefined) ? result.output.statusCode : this.SUCCESS)
            resultData = {
                code: code,
                message: message
            }

            if (code != this.SUCCESS) {
                resultData.message = result.output.payload.message.replace('TypeError: ','');
                resultData.error = result.output.payload.error
            } else {

                resultData.data = result
            }
        } else {
            code = this.SUCCESS
            resultData = {
                code: code,
                message: message
            }
        }
        res["status"](code).send(resultData)

        return {
            message: 'success'
        }
    }

    static error (res, err?) {

        if (err) {
            let result = err.toString()
            try {
                result = JSON.parse(result.replace('TypeError: ',''))
            } catch (e) {
                result = internal(e.toString())
            }
            this.response(res, result)
        }
    }
}