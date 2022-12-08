export class ToTimestamp {
    static convert (strDate) {
        console.log('to string date: ' + strDate.toString())
        let dateString = strDate.toString(),
        dateTimeParts = dateString.split(' '),
        timeParts = dateTimeParts[1].split(':'),
        dateParts = dateTimeParts[0].split('-')

        let date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1])
        let datum = Date.parse(strDate)
        return datum/1000
        
        // return strDate.getTime()
        
        // let dateString = '17-09-2013 10:08',
        // dateTimeParts = strDate.split(' '),
        // timeParts = dateTimeParts[1].split(':'),
        // dateParts = dateTimeParts[0].split('-'),
        // date;

        // date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);

        // console.log(date.getTime()); //1379426880000
        // console.log(date); //Tue Sep 17 2013 10:08:00 GMT-0400

        // let datum = Date.parse(strDate);
        // return datum/1000;
    }
}