import {Table, Model, PrimaryKey, Column, AutoIncrement, BelongsToMany, DefaultScope, Scopes} from "sequelize-typescript";
import * as uuidv1 from 'uuid/v1'

@Table({
    tableName: 'user',
    timestamps: false
})
export class User extends Model<User> {

    @PrimaryKey
    @Column
    id:string

    @Column
    role:string

    @Column
    email:string

    @Column
    password:string

    @Column
    token:string

    @Column
    state:string

    @Column({
        field: 'created_at'
    })
    createdAt:Date

    public static builder(email:string, password?: string, role?) {
        const user = new User();
        user.id = uuidv1()
        user.role = role
        user.email = email || null
        user.password = password
        user.createdAt = new Date()
        user.state = '1'

        return user
    }
}