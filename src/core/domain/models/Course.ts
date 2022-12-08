import {
    Table, Model, PrimaryKey, Column, AutoIncrement, BelongsToMany, DefaultScope, Scopes,
    BelongsTo, ForeignKey, HasMany
} from "sequelize-typescript";
import * as uuidv1 from 'uuid/v1'
import {Author} from "./Author";

import {StarRating} from "./StarRating";

@Table({
    tableName: 'course',
    timestamps: false
})
export class Course extends Model<Course> {

    @PrimaryKey
    @Column
    id:string

    @ForeignKey(() => Author)
    @Column({
        field: 'author_id'
    })
    authorId: string;

    @BelongsTo(() => Author)
    author?: Author;

    @Column
    name:string

    @Column({
        field: 'img_url'
    })
    imgUrl:string

    @Column
    abstract:string

    @Column({
        field: 'created_at'
    })
    createdAt:Date
    
    @Column
    state:string


    @HasMany(() => StarRating)
    starts?: any;

    public static builder(authorId:string,name: string, imgUrl: string, abstract: string, state?:string ) {
        let course = new Course();
        course.id = uuidv1();
        course.authorId = authorId;
        course.name = name;
        course.imgUrl = imgUrl;
        course.abstract = abstract;
        course.state = state?state:'1'
        course.createdAt = new Date()

        return course;
    }
}