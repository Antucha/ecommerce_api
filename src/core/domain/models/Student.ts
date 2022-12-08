import {Column, Model, PrimaryKey, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany} from "sequelize-typescript";
import {User} from "./User";
import * as uuidv1 from 'uuid/v1'

@Table({
    tableName: 'student',
    timestamps: false
})
export class Student extends Model<Student> {
    @PrimaryKey
    @Column
    id: string

    @ForeignKey(() => User)
    @Column({
        field: 'user_id'
    })
    userId: string;

    @BelongsTo(() => User)
    user?: User;

    @Column
    name: string

    @Column({
        field: 'surname_father'
    })
    surnameFather: string

    @Column({
        field: 'surname_mother'
    })
    surnameMother: string

    @Column
    birth: Date

    @Column({
        field: 'created_at'
    })
    createdAt: Date

    public static builder(
        userId: string,
        name:string,
        surnameFather?: string,
        surnameMother?: string,
    ) {
        const student = new Student()
        student.id = uuidv1()
        student.userId = userId
        student.name = name
        student.surnameFather = surnameFather
        student.surnameMother = surnameMother
        student.birth = new Date()
        student.createdAt = new Date()
        return student
    }
}