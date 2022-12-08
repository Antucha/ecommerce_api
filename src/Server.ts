import app from "./App";
import {createServer} from 'http';
import {sequelize} from './SequelizeConfig';
//import {sentryExecute} from './Sentry'
require('dotenv').config();

const PORT = parseInt(process.env.PORT, 10) || 5000;
const cors = require('cors');

app["use"](cors({origin: '*'}));

const isInLambda = !!process.env.LAMBDA_TASK_ROOT;



//LOG-FILE
/* export let log_file = require('fs').createWriteStream('log.txt', {flags : 'w'})

export function hook_stream(stream, callback) {
    let old_write = stream.write

    stream.write = (function(write) {
        return function(string, encoding, fd) {
            write.apply(stream, arguments)  // comments this line if you don't want output in the console
            callback(string, encoding, fd)
        }
    })(stream.write)

    return function() {
        stream.write = old_write
    }
}


export let unhook_stdout = hook_stream(process.stdout, function(string, encoding, fd) {
    log_file.write(string, encoding)
})

export let unhook_stderr = hook_stream(process.stderr, function(string, encoding, fd) {
    log_file.write(string, encoding)
}) */

// finish log

// ENTRY EXECUTUTION
// sentryExecute();

if (isInLambda) {
    const serverlessExpress = require('aws-serverless-express');
    const serverApp = serverlessExpress.createServer(app);
    module.exports.handler = (event, context) => serverlessExpress.proxy(serverApp, event, context)
    // ( async () => {
    //     await sequelize.databaseVersion();
    //
    // })();
} else {
    ( async () => {
        await sequelize.databaseVersion();
        createServer(app)
            .listen(
                PORT,
                () => console.info(`Server running on port ${PORT}`)
            );
    })();
}
