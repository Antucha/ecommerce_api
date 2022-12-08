import {ErrorCustom} from "../error/ErrorCustom";
import {badRequest} from "boom";

export class ObjectArrayToString {
    static convert(value) {
        // if (!Array.isArray(value) && !(typeof value === 'object')) {
        //     ErrorCustom.generate(badRequest('Valor debes ser objeto o coleccion\n' + value))
        // }

        return JSON.stringify(value)
    }

}