exports.log = (message) => {
        var d = new Date();
        console.log(d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' ' + d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' | ' + message);
}
