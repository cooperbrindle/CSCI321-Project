var router = require('express').Router();
var dbconn = require('../sqlConnection');
const log = require('../lib/log').log;




router.post('/eventslist', (req, res) => {
	log(' Request made to: /events');

	try{
	if(!req.body.category || typeof req.body.category != "string") {
		res.status(400).send("400 Bad Request")
	}

	const category = req.body.category;
	var data;
	dbconn.query('SELECT * FROM EVENTS ORDER BY STR_TO_DATE(startdate, \'%d/%m/%Y\')', (err, result, fields) => {
		if (err) throw err;
		//console.log(result);
		data = result;
		res.json(result);
	});
	}catch(err){
		log('ERROR: ' + err);
	}
		
})

module.exports = router;