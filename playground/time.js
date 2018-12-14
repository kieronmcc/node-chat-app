const moment = require('moment');

// var date = new Date();
// console.log('Month: ', date.getMonth());

// var date = moment();
//
// date.add(1, 'year');
// console.log(date.format('Do MMMM, YYYY'));

// challenge format time as HH:MM am unpadded hr padded mins
var createdAt = 6256546
var now = moment(createdAt);
var timeStamp = moment().valueOf();
console.log(timeStamp);

//now.subtract(3, 'hour');
console.log('Time is:', now.format('h:mm a'));
