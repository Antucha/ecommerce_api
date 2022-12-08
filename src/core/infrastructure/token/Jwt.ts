import {sign, verify} from 'jsonwebtoken'
import * as sha256 from 'sha256'
import * as uuidv1 from 'uuid/v1'
import {ConfigApp} from '../../../config/ConfigApp'
import {TokenRepository} from "../../domain/repository/TokenRepository";
require("dotenv").config();
export class Jwt implements TokenRepository{
    public generate(content) {
        let payload = {
            jti: uuidv1(),
            sub: content,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30 * 4) // 4 meses
        };

        return sign(payload, ConfigApp.tokenSecret)
    }

    public verify (token) {
        let decoded:boolean = false;
        try {
            decoded = (verify(token, ConfigApp.tokenSecret) !== null);
        } catch (e) {
            decoded = false; // still false
        }
        return decoded;
    }

    public decode (token) {
        return verify(token, ConfigApp.tokenSecret)
    }
}