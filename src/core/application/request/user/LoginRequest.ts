import {ErrorCustom} from "../../../common/error/ErrorCustom";
import {badRequest} from "boom";

export class LoginRequest {

    public email
    public password
    public role


    constructor (email, password, role) {
        this.email = email || ''
        this.password = password.trim() || '';
        this.role = role || '';
        this.validate()
    }

    public validate (): void {
        if (this.email == 0 && this.email.length == 0) {
            ErrorCustom.generate(badRequest("Usuario no es valido."));
        }

        if (! this.validateEmail() && this.email.length > 0) {
            ErrorCustom.generate(badRequest("Email no es valido."));
        }


        if (this.role.length == 0) {
            ErrorCustom.generate(badRequest("El rol del usuario no es valido."));
        }
    }

    public validateEmail(): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.email).toLowerCase())
    }
}
