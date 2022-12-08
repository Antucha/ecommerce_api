import {LoginRequest} from "../request/user/LoginRequest";
import {UserRepository} from "../../domain/repository/UserRepository";
import {compareSync, hashSync} from 'bcryptjs';
import {badRequest, notFound, unauthorized} from 'boom'
import {TokenRepository} from "../../domain/repository/TokenRepository";
import {RegisterRequest} from "../request/user/RegisterRequest";
import {User} from "../../domain/models/User";
import {ErrorCustom} from "../../common/error/ErrorCustom";
import {Student} from "../../domain/models/Student";
import {Author} from "../../domain/models/Author";
import {StudentRepository} from "../../domain/repository/StudentRepository";
import {AuthorRepository} from "../../domain/repository/AuthorRepository";
import {TokenStudentPresentation} from "../../presentation/user/TokenStudentPresentation";
import {TokenAuthorPresentation} from "../../presentation/user/TokenAuthorPresentation";
import {UserRoleEnum} from "../../common/base/enum/UserRoleEnum";
import {LoginTimes} from "../../domain/models/LoginTimes";
import {LoginTimesRepository} from "../../domain/repository/LoginTimesRepository";

export class AuthenticationService {

    private repository:UserRepository
    private studentRepository: StudentRepository
    private authorRepository: AuthorRepository
    private token:TokenRepository
    private loginTimesRepository: LoginTimesRepository

    constructor (
        repository: UserRepository,
        studentRepository: StudentRepository,
        authorRepository: AuthorRepository,
        token: TokenRepository,
        loginTimesRepository: LoginTimesRepository,
    ) {
        this.repository = repository;
        this.studentRepository = studentRepository;
        this.authorRepository = authorRepository;
        this.token = token;
        this.loginTimesRepository = loginTimesRepository

    }

    private trackLogin (userId) {
        const LOGINTIMES: LoginTimes = LoginTimes.builder(userId)

        this.loginTimesRepository.create(LOGINTIMES)
    }

    public async login (request: LoginRequest) {
        console.log('request: ', request)
        switch (request.role) {
            case UserRoleEnum.STUDENT:
                return this.studentLogin(request); break;
            case UserRoleEnum.AUTHOR:
                return this.authorLogin(request); break;
            default:
                ErrorCustom.generate(badRequest('No es el rol autorizado'))
        }
    }


    private async studentLogin (request: LoginRequest) {

        const STUDENT:Student = await this.studentRepository.getByEmailAndRole(request.email, request.role)
        console.log('STUDENT: ', STUDENT)
        if (!STUDENT) {
            ErrorCustom.generate(notFound('User doesnt exist'))
        }

        console.log('estudianteee: ', STUDENT)

        const isCorrectPassword = compareSync(request.password, STUDENT.user.password);
        console.log('isCorrectPassword: ', isCorrectPassword)

        // Comentar en caso de no validar
        if (! isCorrectPassword) {
            ErrorCustom.generate(unauthorized('Unauthorized user'))
        }
        console.log('PASO EL PASWORD')

        this.trackLogin(STUDENT.userId)

        console.log('PASO EL TRACKINIG')

        return TokenStudentPresentation.build(STUDENT, this.token)
    }

    private async authorLogin (request: LoginRequest) {
        
        const AUTHOR:Author = await this.authorRepository.getByEmailAndRole(request.email, request.role)
        console.log('AUTHOR: ', AUTHOR)

        if (!AUTHOR) {
            ErrorCustom.generate(notFound('User doesnt exist'))
        }

        console.log('authorrr: ', AUTHOR)

        const isCorrectPassword = compareSync(request.password, AUTHOR.user.password);

        // Comentar en caso de no validar
        if (! isCorrectPassword) {
            ErrorCustom.generate(unauthorized('Unauthorized user'))
        }

        this.trackLogin(AUTHOR.userId)


        return TokenAuthorPresentation.build(AUTHOR, this.token)
       
    }


    public async register (request: RegisterRequest) {

        const haveEmail = await this.repository.getUserByEmailAndRole(request.email, request.role)
        if (haveEmail) {
            ErrorCustom.generate(badRequest('El correo ' + request.email + ' ya existe'))
        }

        const password = hashSync(request.password, 4)

        const USER = User.builder(
            request.email,
            password,
            (request.role) ? request.role : 'user'
        );
        await USER.save()
        
        let USER_TYPE :any;
        switch (request.role) {
            case UserRoleEnum.STUDENT:
                USER_TYPE = await this.createStudent(request, USER); break;
            case UserRoleEnum.AUTHOR:
                USER_TYPE = await  this.createAuthor(request, USER); break;
            default:
                ErrorCustom.generate(badRequest('No es el rol autorizado')); break;
        }


        return {
            user: USER,
            userType: USER_TYPE
        }
    }

    private async createStudent (request: RegisterRequest, USER:User) {

        const STUDENT = Student.builder(USER.id, request.name, request.surnameFather, request.surnameMother);
        await STUDENT.save();
        return STUDENT
    }

    private async createAuthor (request: RegisterRequest, USER:User) {

        const AUTHOR = Author.builder(USER.id, request.name, request.surnameFather, request.surnameMother);
        await AUTHOR.save();
        return AUTHOR
    }


}
