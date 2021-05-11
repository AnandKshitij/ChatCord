// we use the moment library to get the time
// h means hours, mm means minutes and a means am or pm
const moment = require('moment');

function formatMessage(username, text){
    return{
        username,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;