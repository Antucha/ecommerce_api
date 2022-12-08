
import {CourseService} from "../services/CourseService";
import {CourseSequelize} from "../../infrastructure/persistence/db/CourseSequelize";
import {Course} from "../../domain/models/Course";
import { StarRating} from "../../domain/models/StarRating";
import { StarRatingSequelize } from "../../infrastructure/persistence/db/StarRatingSequelize";
import {SecurityRequest} from "../request/security/SecurityRequest";
import {AuthInterface} from "../../domain/Entity/AuthInterface";

export class CourseFactory {

    private service: CourseService;

    constructor () {
        this.service = new CourseService(
            new CourseSequelize(Course),
            new StarRatingSequelize(StarRating)
        )
    }


    public async getAll (req: AuthInterface,request) {
        return await this.service.getAll(req, request)
    }

    public async saveCourse (req: AuthInterface,request) {
        return await this.service.saveCourse(req, request)
    }

    public async update (req: AuthInterface, courseId,request) {
        return await this.service.update(req, courseId, request)
    }

    public async delete (req: AuthInterface, courseId) {
        return await this.service.delete(req, courseId)
    }
}