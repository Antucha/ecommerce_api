import {NextFunction, Request, Response} from "express";
import {AuthenticationController} from '../controllers/AuthenticationController'
import {ResponseApp} from "../core/common/response/ResponseApp";
import {SecurityController} from "../controllers/SecurityController";
import {StudentController} from "../controllers/StudentController";
import {CourseController} from "../controllers/CourseController";

export class Routes {

    private response: ResponseApp = new ResponseApp()
    public authController: AuthenticationController = new AuthenticationController
    public securityController: SecurityController = new SecurityController()
    public studentController: StudentController = new StudentController()
    public courseController: CourseController = new CourseController()


    private methodAsync = fn => (...args) => fn(...args).catch((args[2]));
    public routes(app): void {
        app.route('/api')
            .get((req: Request, res: Response) => {
                res["status"](200).send({
                    message: 'Welcome to the queestudiar api v3'
                })
            })
        // Authentication
        app.route('/api/auth/login').post(this.methodAsync(this.authController.login), this.errorHandle)
        app.route('/api/auth/register').post(this.methodAsync(this.authController.register), this.errorHandle)



        // Student
        app.route('/api/student').get(this.securityController.observe, this.methodAsync(this.studentController.getProfile), this.errorHandle)
        app.route('/api/student/course/:courseId').put(this.securityController.observe, this.methodAsync(this.studentController.getProfile), this.errorHandle)

        // Author
        app.route('/api/author').get(this.securityController.observe, this.methodAsync(this.studentController.getProfile), this.errorHandle)

        // Course
        app.route('/api/course').get(this.securityController.observe, this.methodAsync(this.courseController.getAll), this.errorHandle)
        app.route('/api/course').post(this.securityController.observe, this.methodAsync(this.courseController.saveCourse), this.errorHandle)
        app.route('/api/course/:courseId').put(this.securityController.observe, this.methodAsync(this.courseController.update), this.errorHandle)
        app.route('/api/course/:courseId').delete(this.securityController.observe, this.methodAsync(this.courseController.delete), this.errorHandle)

        //TESTING DEPLOY
        app.route('/v1/health').get(this.methodAsync(this.authController.deployTesting), this.errorHandle)
    }

    private errorHandle (err, req: Request, res: Response, next: NextFunction) {
        console.log(err.toString())
        ResponseApp.error(res, err.toString())
    }
}