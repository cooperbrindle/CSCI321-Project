var router = require('express').Router();
var dbconn = require('../sqlConnection');
const log = require('../lib/log').log;




router.post('/eventlist', (req, res) => {
	log(' Request made to: /events');

	try{
	if(!req.body.category || typeof req.body.category != "string") {
		res.status(400).send("400 Bad Request")
	}

	const category = req.body.category;
	var data;
	dbconn.query('SELECT * FROM EVENTS', (err, result, fields) => {
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