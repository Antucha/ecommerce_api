import {Sequelize} from 'sequelize-typescript';
import {ConfigApp} from './config/ConfigApp'
import {Dialect} from "sequelize";

export const sequelize: Sequelize = new Sequelize(ConfigApp.db.database,ConfigApp.db.username,ConfigApp.db.password,{
    dialect: ConfigApp.db.dialect as Dialect,
    //operatorsAliases: Sequelize.Op as any,
    //database: ConfigApp.db.database,
    //username: ConfigApp.db.username,
    host: ConfigApp.db.host,
    password: ConfigApp.db.password,
    modelPaths: [__dirname + ConfigApp.modelPath],
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,        
        }
    }
});

//
// export class SequelizeConfig{
//
//     public static sequelize: Sequelize = new Sequelize({
//         dialect: 'mysql',
//         operatorsAliases: Sequelize.Op as any,
//         database: 'deepmy_local',
//         username: 'root',
//         password: '1234',
//         modelPaths: [__dirname + '/models']
//     })
//
// }
