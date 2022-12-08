import {ErrorCustom} from "../../../common/error/ErrorCustom";
import {unauthorized} from "boom";

export class SecurityRequest {

    public header
    public type
    public token

    constructor (header) {
        this.header = header
        this.validate()
        this.build()
    }

    private validate () {
        if (!this.header || this.header === null) {
            ErrorCustom.generate(unauthorized('Usuario no autorizado'))
        }
    }

    private build() {
        const header = this.header.split(' ')
        this.type = header[0] || null
        this.token = header[1] || null

        if (!this.type || !this.token) {
            ErrorCustom.generate(unauthorized('Usuario no autorizado'))
        }
    }
}