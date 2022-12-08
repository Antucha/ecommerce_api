import {TokenRepository} from "../../domain/repository/TokenRepository";
import {Student} from "../../domain/models/Student";

export class TokenStudentPresentation {
    public static build (student: Student, token: TokenRepository) {
        const userData = {
            id: student.userId,
            studentId: student.id,
            email: student.user.email,
            role: student.user.role,
            name: student.name,
            surnameFather: student.surnameFather,
            surnameMother: student.surnameMother
        }

        return {
            token: token.generate(userData),
            user: userData
        }
    }
}