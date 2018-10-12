var router = require('express').Router();
var dbconn = require('../lib/sqlConnection');
const log = require('../lib/log').log;
var tokenAuth = require('../lib/tokenAuth');
var googleMapsClient = require('./key.js');


router.post('/eventslist', (req, res) => {
	log(' Request made to: /events');

	try{
	if(!req.body.category || typeof req.body.category != "string") {
		res.status(400).send("400 Bad Request")
	}

	const category = req.body.category;
	var data;
	dbconn.query('SELECT * FROM EVENTS ORDER BY STR_TO_DATE(startdate, \'%d/%m/%Y\')', (err, result) => {
		if (err) throw err;
		data = result;
		res.json(result);
	});
	}catch(err){
		log('ERROR: ' + err);
	}
		
})



///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.use((req, res, next) => {tokenAuth.checkRequestToken(req, res, next)});


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/registerconst', (req, res) => {
    
    log(' Request made to: /registerconst');
	try{
        var data = req.body;
        console.log(data);
        
        //check ctx row exists and drop
                
                dbconn.query('DELETE FROM EVENTCONSTITUENTEXPORT WHERE id = ? AND eventname = ?',[data.id, data.eventname], (err, result) => {
                    //insert new row
                    dbconn.query('INSERT INTO EVENTCONSTITUENTEXPORT SET ?', data, (err, result) => {
                        if(err) throw err;
                        log('Updated eventconstituent ' + data.eventname + ' ' + data.id);
                        res.json('ok');
                    });

                });
	}catch(err){
		log('ERROR: ' + err);
	}
		
})


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/registerguest', (req, res) => {
    
    log(' Request made to: /registerguest');
	try{
        var data = req.body;
        console.log(data);
        
        //check ctx row exists and drop
                
                dbconn.query('DELETE FROM EVENTGUESTEXPORT WHERE id = ? AND eventname = ?',[data.id, data.eventname], (err, result) => {
                    //insert new row
                    dbconn.query('INSERT INTO EVENTGUESTEXPORT SET ?', data, (err, result) => {
                        if(err) throw err;
                        log('Updated eventguest ' + data.eventname + ' ' + data.id);
                        res.json('ok');
                    });

                });
	}catch(err){
		log('ERROR: ' + err);
	}
		
})

router.post('/geocodeaddress', (req, res) => {
    
    console.log(' Request made to: /geocodeaddress');
	try{
        var data = req.body.data;
        console.log(data.state);    
        var state = data.state.toUpperCase();
        googleMapsClient.geocode({
            address: data.address + ', ' + data.city + ', ' + state,
          }, function(err, response) {
            if (!err) {
              var longitude = response.json.results[0].geometry.location.lng;
              var latitude = response.json.results[0].geometry.location.lat;
              dbconn.query('UPDATE EVENTS SET latitude = ?, longitude = ? WHERE eventname = ?', [latitude,longitude, data.eventname], (err, result) => {
                if(err) throw err;
                console.log('Updated events ' + data.eventname);
                console.log(latitude + ' ' + longitude);
                res.json({latitude, longitude});
            });
            }
            else{
                console.log('Error?');
                res.json();
            }
          });
    }
    catch(err){
        log('ERROR: ' + err);
    }
})

module.exports = router;