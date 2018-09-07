var router = require('express').Router();
var sql = require('mysql');
const log = require('./lib/log').log;

router.post('/discounts', (req, res) => {
	log(' Request made to: /discounts');

	try{
	if(!req.body.category || typeof req.body.category != "string") {
		res.status(400).send("400 Bad Request")
	}

	const category = req.body.category;
	var data;
	sql.query('SELECT * FROM DISCOUNTS WHERE partnerType = \'' + category + '\'', (err, result, fields) => {
		if (err) throw err;
		//console.log(result);
		data = result;
		res.json(result);
	});
	}catch(err){
		log('ERROR: ' + err);
	}
		
})