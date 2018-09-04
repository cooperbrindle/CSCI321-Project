var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "yourusername",
	password: "yourpassword"
});

con.connect((err) => {
	if (err) throw err;
	console.log("Connected!");
});
 

 

app.get('/discounts', (req, res) => {

	if(!req.body.notes || typeof req.body.notes != "string") {
		res.status(400).send("400 Bad Request")
	}

	var category = req.body.category;
	var data;
	con.query('SELECT * FROM DISCOUNTS WHERE partnerType = '+category, (err, result, fields) => {
		if (err) throw err;
		console.log(result);
		data = result;
	});
	//res.json(data);
	res.json([
		{blurb: 'item description 1'},
		{blurb: 'item description 2'},
		{blurb: 'item description 3'},
		{blurb: 'item description 4'},
		{blurb: 'item description 5'},
		{blurb: 'item description 6'},
		{blurb: 'item description 7'},
	]);
})
 
app.listen(3000)


///////////////
// npm install --save express body-parser
///////////////