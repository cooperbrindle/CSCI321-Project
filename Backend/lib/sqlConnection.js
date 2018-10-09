const mysql = require('mysql');

const dbconn = mysql.createConnection({
	host: "localhost",
	user: "cooperb",
	password: "Balotelli45"
});

dbconn.connect((err) => {
	if (err) throw err;
	console.log("Connected!");
});
dbconn.query('use alumniapp', (err, result, fields) => {
	if(err) throw err;
}); 




module.exports = dbconn;