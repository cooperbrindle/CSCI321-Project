/////////////////////////////////////////
// 	  /promotions/	route handler
//
//	- /discounts
//	- /highlights
////////////////////////////////////////

var router = require('express').Router();
var dbconn = require('../lib/sqlConnection');
const log = require('../lib/log').log;
const urlList = require('../config').urlList;



///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/discounts', (req, res) => {
	log('Request made to: /discounts');

	//Return entire list of discounts
	try{
	if(!req.body.category || typeof req.body.category != "string") {
		res.status(400).send("400 Bad Request")
	}

	dbconn.query('SELECT * FROM DISCOUNTS ORDER BY titleID', (err, result, fields) => {
		if (err) throw err;
		res.json(result);
	});
	}catch(err){
		log('ERROR: ' + err);
	}
		
})



///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/highlights', async(req, res) => {
	log('Request made to: /highlights');

	//Returns items for HomePage highlights carousel
	//	Currently:
	//	2 closest events
	//	1 discount
	//	1 magazine article link
	// ALSO RETURNS URL LIST NOW FOR WHEN HOMEPAGE IS LOADED
	try{
		var event1, event2, discount, mag;
		var err, result;
		//EVENTS
		err, result = await dbconn.query('SELECT * FROM EVENTS ORDER BY STR_TO_DATE(startdate, \'%d/%m/%Y\') LIMIT 2')
		if (err) throw err;
		event1 = result[0];
		event2 = result[1];
		//DISCOUNT
		err, result = await dbconn.query('SELECT * FROM DISCOUNTS ORDER BY RAND() LIMIT 1');
		if (err) throw err;
		discount = result[0];
		//MAGAZINE
		err, result = await dbconn.query('SELECT * FROM MAGAZINEHIGHLIGHTS ORDER BY RAND() LIMIT 1');
		if (err) throw err;
		mag = result[0];

		//compile data
		var data = [
			{type: 'event', data: event1},
			{type: 'discount', data: discount},
			{type: 'event', data: event2},
			{type: 'mag', data: mag},
		];
		res.json({highlights: data, urlList: urlList});

	}catch(err){
		log('ERROR: ' + err);
	}
		
})

module.exports = router;