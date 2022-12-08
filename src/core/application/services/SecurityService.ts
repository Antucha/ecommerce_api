import {SecurityRequest} from "../request/security/SecurityRequest";
import {TokenRepository} from "../../domain/repository/TokenRepository";
import {ErrorCustom} from "../../common/error/ErrorCustom";
import {unauthorized} from "boom";
import {UserRoleEnum} from "../../common/base/enum/UserRoleEnum";

export class SecurityService {

    private tokenRepository: TokenRepository

    constructor (tokenRepository: TokenRepository) {
        this.tokenRepository = tokenRepository
    }

    public validate (req: SecurityRequest) {
        if (!this.tokenRepository.verify(req.token)) {
            ErrorCustom.generate(unauthorized('Usuario no autorizado'))
        }
        const decode = this.tokenRepository.decode(req.token)
        console.log(decode)


        switch (decode.sub.role) {
            case UserRoleEnum.AUTHOR:
                return {
                    userId: decode.sub.id,
                    authorId: decode.sub.authorId,
                    email: decode.sub.email,
                    role: decode.sub.role,
                    name: decode.sub.name,
                    surnameFather: decode.sub.surnameFather,
                    surnameMother: decode.sub.surnameMother
                }
            case UserRoleEnum.STUDENT:
                return {
                    userId: decode.sub.id,
                    studentId: decode.sub.studentId,
                    email: decode.sub.email,
                    role: decode.sub.role,
                    name: decode.sub.name,
                    surnameFather: decode.sub.surnameFather,
                    surnameMother: decode.sub.surnameMother
                }
            default:
                ErrorCustom.generate(unauthorized('Usuario no autorizado'))
        }


    }

}