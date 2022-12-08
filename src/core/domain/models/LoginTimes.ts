import {
    Table, Model, PrimaryKey, Column, AutoIncrement, BelongsToMany, DefaultScope, Scopes,
    BelongsTo, ForeignKey
} from "sequelize-typescript";
import * as uuidv1 from 'uuid/v1'
import {User} from "./User";

@Table({
    tableName: 'login_times',
    timestamps: false
})
export class LoginTimes extends Model<LoginTimes> {

    @PrimaryKey
    @Column
    id:string

    @ForeignKey(() => User)
    @Column({
        field: 'user_id'
    })
    userId: string

    @BelongsTo(() => User)
    user?: User

    @Column({
        field: 'created_at'
    })
    createdAt:Date

    public static builder(userId) {
        const loginTimes = new LoginTimes()
        loginTimes.id = uuidv1()
        loginTimes.userId = userId
        loginTimes.createdAt = new Date()

        return loginTimes
    }
}