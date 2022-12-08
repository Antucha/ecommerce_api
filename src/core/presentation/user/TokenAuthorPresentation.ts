import {TokenRepository} from "../../domain/repository/TokenRepository";
import {Author} from "../../domain/models/Author";

export class TokenAuthorPresentation {
    public static build (author: Author, token: TokenRepository) {
        const userData = {
            id: author.userId,
            authorId: author.id,
            email: author.user.email,
            role: author.user.role,
            name: author.name,
            surnameFather: author.surnameFather,
            surnameMother: author.surnameMother
        }

        return {
            token: token.generate(userData),
            user: userData
        }
    }
}