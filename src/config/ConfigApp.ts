require('dotenv').config();

export const ConfigApp = {
    tokenSecret: process.env.TOKEN_SECRET,
    modelPath: process.env.MODEL_PATH,
    db: {
        dialect: process.env.DB_DIALECT,
        database: process.env.DB_NAME,
        username: process.env.DB_USER_NAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
    }
}
