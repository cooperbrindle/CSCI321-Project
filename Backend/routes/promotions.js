var router = require('express').Router();
var dbconn = require('../lib/sqlConnection');
const log = require('../lib/log').log;




router.post('/discounts', (req, res) => {
	log(' Request made to: /discounts');

	try{
	if(!req.body.category || typeof req.body.category != "string") {
		res.status(400).send("400 Bad Request")
	}

	const category = req.body.category;
	var data;
	dbconn.query('SELECT * FROM DISCOUNTS ORDER BY titleID', (err, result, fields) => {
		if (err) throw err;
		//console.log(result);
		data = result;
		res.json(result);
	});
	}catch(err){
		log('ERROR: ' + err);
	}
		
})




router.post('/highlights', async(req, res) => {
	log(' Request made to: /highlights');

	try{
		var event1, event2, discount, mag;
		var err, result;
		err, result = await dbconn.query('SELECT * FROM EVENTS ORDER BY STR_TO_DATE(startdate, \'%d/%m/%Y\') LIMIT 2')
		if (err) throw err;
		event1 = result[0];
		event2 = result[1];

		err, result = await dbconn.query('SELECT * FROM DISCOUNTS ORDER BY RAND() LIMIT 1');
		if (err) throw err;
		discount = result[0];

		err, result = await dbconn.query('SELECT * FROM MAGAZINEHIGHLIGHTS ORDER BY RAND() LIMIT 1');
		if (err) throw err;
		mag = result[0];

		
		var data = [
			{type: 'event', data: event1},
			{type: 'discount', data: discount},
			{type: 'event', data: event2},
			{type: 'mag', data: mag},
		];
		res.json(data);

	}catch(err){
		log('ERROR: ' + err);
	}
		
})

module.exports = router;