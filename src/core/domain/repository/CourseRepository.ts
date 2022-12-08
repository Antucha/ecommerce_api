import {ModelInterface} from "./ModelInterface";

export interface CourseRepository extends ModelInterface{
    getById(courseId: string)
    getAll(ath, request)
    
}