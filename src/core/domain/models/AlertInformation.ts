import {
    Table, Model, PrimaryKey, Column, AutoIncrement, BelongsToMany, DefaultScope, Scopes,
    BelongsTo, ForeignKey
} from "sequelize-typescript";
import * as uuidv1 from 'uuid/v1'
import {Student} from "./Student";

@Table({
    tableName: 'alert_information',
    timestamps: false
})
export class AlertInformation extends Model<AlertInformation> {

    @PrimaryKey
    @Column
    id:string

    @ForeignKey(() => Student)
    @Column({
        field: 'student_id'
    })
    studentId: string;

    @BelongsTo(() => Student)
    student?: Student;

    @Column
    state:string

    @Column({
        field: 'created_at'
    })
    createdAt:Date

    public static builder(studentId:string) {
        const alertInformation = new AlertInformation()

        alertInformation.id = uuidv1()
        alertInformation.studentId = studentId
        alertInformation.state = '1'
        alertInformation.createdAt = new Date()

        return alertInformation
    }
}