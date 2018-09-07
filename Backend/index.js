const log = require('./lib/log').log;
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

log('Session Started');

const sql = mysql.createConnection({
	host: "localhost",
	user: "danielm",
	password: "Shiny380"
});

sql.connect((err) => {
	if (err) throw err;
	console.log("Connected!");
});
sql.query('use alumniapp', (err, result, fields) => {
	if(err) throw err;
	else console.log(result);
}); 

 
app.use(require('./routes'));

 
app.listen(80)


///////////////
// npm install --save express body-parser
///////////////
