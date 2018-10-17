/////////////////////////////////////////
// Output log function
//	will later have options for all data options
//	such as IP, time, date, user
// 
//	currently logs with time data and message
////////////////////////////////////////

exports.log = (message) => {
        var d = new Date();
        console.log(d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' ' + d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' | ' + message);
}
