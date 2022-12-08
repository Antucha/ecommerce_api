import {XMLHttpRequest} from 'xmlhttprequest-ts'
import moment = require('moment');

export class FormatDate {

    static formatUtc(date, format?) {
        const dateTime = new Date(date)
        return moment(dateTime).utc().locale('es').format(format ? format : 'MM/DD/YYYY hh:mm');
    }
}