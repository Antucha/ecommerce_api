import {badRequest} from "boom";
import {ErrorCustom} from "../../../common/error/ErrorCustom";

export class RegisterRequest{
    public email
    public password
    public role
    public name
    public surnameFather
    public surnameMother
    

    constructor ( email,password, role, name, surnameFather, surnameMother) {
        this.email = email
        this.password = password || ''
        this.role = role || ''
        this.name = name || ''
        this.surnameFather = surnameFather || ''
        this.surnameMother = surnameMother || ''


        this.validate()
    }

    public validate (): void {
        if (this.email == 0 || this.email.length < 1) {
            ErrorCustom.generate(badRequest("Usuario no es válido."));
        }

        if (! this.validateEmail() && this.email.length > 0) {
            ErrorCustom.generate(badRequest("Email no es válido."));
        }

        if (this.password.length < 6) {
            ErrorCustom.generate(badRequest("El password debe contener mínimo 6 digitos."));
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