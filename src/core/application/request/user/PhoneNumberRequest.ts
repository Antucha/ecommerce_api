import {badRequest} from "boom";
import {ErrorCustom} from "../../../common/error/ErrorCustom";

export class PhoneNumberRequest{
    public email
    public countryCode
    public phone
    public user
    public username
    public role

    constructor (user) {
        this.user = user || ''
        this.email = ''
        this.countryCode = ''
        this.username = ''
        this.phone = ''

        this.filter()
        this.validate()
    }

    public validate (): void {
        if (this.phone.length == 0 && this.email == 0 && this.username.length == 0) {
            ErrorCustom.generate(badRequest("Usuario no es válido."));
        }

        if (! this.validateEmail() && this.email.length > 0) {
            ErrorCustom.generate(badRequest("Email no es válido."));
        }
        if (this.user.length < 2) {
            ErrorCustom.generate(badRequest("El nombre no es valido."));
        }
    }

    public validateEmail(): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.email).toLowerCase())
    }

    private filter () {

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(this.user).toLowerCase())) {
            this.email = this.user
        } else {
            const phoneArray = this.user.split(' ')
            if (phoneArray.length > 1) {
                const countryCode = phoneArray[0].replace('+', '')
                phoneArray.shift()
                let phone = ''
                phoneArray.map(item => {
                    phone += item
                })
                this.countryCode = countryCode
                this.phone = phone
            } else {
                this.username = this.user
            }
        }
    }
}