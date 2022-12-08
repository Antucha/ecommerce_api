import {Column, Model, PrimaryKey, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany} from "sequelize-typescript";
import {User} from "./User";
import * as uuidv1 from 'uuid/v1'

@Table({
    tableName: 'author',
    timestamps: false
})
export class Author extends Model<Author> {
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
        const author = new Author()
        author.id = uuidv1()
        author.userId = userId
        author.name = name
        author.surnameFather = surnameFather
        author.surnameMother = surnameMother
        author.birth = new Date()
        author.createdAt = new Date()
        return author
    }
}