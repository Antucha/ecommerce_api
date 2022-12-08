import {ErrorCustom} from "../../common/error/ErrorCustom";
import {badRequest, notFound, unauthorized} from "boom";
import {CourseRepository} from "../../domain/repository/CourseRepository";
import {StarRatingRepository} from "../../domain/repository/StarRatingRepository";
import {SecurityRequest} from "../request/security/SecurityRequest";
import {AuthInterface} from "../../domain/Entity/AuthInterface";
import {UserRoleEnum} from "../../common/base/enum/UserRoleEnum";
import {UserRepository} from "../../domain/repository/UserRepository";
import {Student} from "../../domain/models/Student";
import {StudentRepository} from "../../domain/repository/StudentRepository";
import {Course} from "../../domain/models/Course";
export class CourseService {

    private repository: CourseRepository
    private starRatingRepository: StarRatingRepository


    constructor (
        repository: CourseRepository,
        starRatingRepository: StarRatingRepository
    ){
        this.repository = repository
        this.starRatingRepository = starRatingRepository
  
    }

    public async getAll(auth: AuthInterface,request) {
        let courses  = this.repository.getAll(auth, request);

        return courses.map(course=>{
            return {
                id: course.id,
                name: course.name,
                imgUrl: course.imgUrl,
                starRating: 0,
                abstract: course.abstract
            }
        })
    }

    public async saveCourse(auth: AuthInterface,data) {
        const request = data.courseModel
        if (!auth) {
            ErrorCustom.generate(unauthorized('Peticion no permitida'))
        }
        console.log('COURSE NEW: ', request)
        const COURSE= Course.builder(auth.authorId, request.name, request.imgUrl, request.abstract);
        console.log('COURSE: ', COURSE)
        await COURSE.save();
        return COURSE

    }

    public async update(auth: AuthInterface, courseId,request) {
        if (!auth) {
            ErrorCustom.generate(unauthorized('Peticion no permitida'))
        }
        let COURSE= await this.repository.getById(courseId);
        COURSE.name = request.name;
        COURSE.imgUrl = request.imgUrl;
        COURSE.abstract = request.abstract;

        await COURSE.save();
    }

    public async delete(auth: AuthInterface,courseId) {
        if (!auth) {
            ErrorCustom.generate(unauthorized('Peticion no permitida'))
        }
        let COURSE= await this.repository.getById(courseId);
        COURSE.state = '0';

        await COURSE.save();
    }
}
