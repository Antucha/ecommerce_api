import {internal} from "boom";
import Boom = require("boom");

export class ErrorCustom{

    static generate(error: Boom|string) {
        let errorString = JSON.stringify(error)
        if (errorString) {
            throw new TypeError(errorString)
        } else {
            errorString = JSON.stringify(internal('Error interno'))
            throw new TypeError(errorString)
        }
    }
}