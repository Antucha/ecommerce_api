import {
    Table, Model, PrimaryKey, Column, AutoIncrement, BelongsToMany, DefaultScope, Scopes,
    BelongsTo, ForeignKey
} from "sequelize-typescript";
import * as uuidv1 from 'uuid/v1'
import {User} from "./User";
import { Course } from "./Course"
import {Student} from "./Student";

@Table({
    tableName: 'star_rating',
    timestamps: false
})
export class StarRating extends Model<StarRating> {

    @ForeignKey(() => Course)
    @Column({
        field: 'course_id'
    })
    courseId: string;

    @ForeignKey(() => Student)
    @Column({
        field: 'student_id'
    })
    studentId: string;

    @BelongsTo(() => Course)
    course?: Course

    @BelongsTo(() => Student)
    student?: Student

    @Column
    quantity: number

    @Column({
        field: 'last_update'
    })
    lastUpdate:Date


    public static builder(courseId: string, studentId: string, quantity: number, lastUpdate?:Date) {
        const starRating = new StarRating()
        starRating.courseId = courseId
        starRating.studentId = studentId
        starRating.quantity = quantity
        starRating.lastUpdate = lastUpdate?lastUpdate:new Date()

        return starRating
    }
}