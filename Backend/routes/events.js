/////////////////////////////////////////
// 	  /events/	route handler
//
//	- /eventslist
//	- /registerconst
//	- /registerguest
//  - /geocodeaddress
////////////////////////////////////////

var router = require('express').Router();
var dbconn = require('../lib/sqlConnection');
const log = require('../lib/log').log;
var tokenAuth = require('../lib/tokenAuth');
const key = require('./key.js');
var googleMapsClient = require('@google/maps').createClient({
    key: key.googleKey,
});


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/eventslist', (req, res) => {
	log('Request made to: /events');

	try{
	if(!req.body.category || typeof req.body.category != "string") {
		res.status(400).send("400 Bad Request")
	}

    //Retrieve and return entre events list (ORDER BY START DATE)
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
// ENABLE TOKEN AUTHENTICATION FOR FOLLOWING ROUTES
router.use((req, res, next) => {tokenAuth.checkRequestToken(req, res, next)});


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/registerconst', async(req, res) => {
    
    log('Request made to: /registerconst');
	try{
        var data = req.body;
        
        //Check if already registered
        var qry = 'SELECT id FROM EVENTCONSTITUENTEXPORT WHERE id = ? && eventname = ?'
        var err, result = await dbconn.query(qry, [data.id, data.eventname]);
        if(err) throw err;
        if(result.length > 0){
            res.json({error: 'Already Registered'});
            return;
        }

        //insert new row
        dbconn.query('INSERT INTO EVENTCONSTITUENTEXPORT SET ?', data, (err, result) => {
            if(err) throw err;
            log('Registered Constituent for ' + data.eventname + ' - Constituent ID: ' + data.id);
            res.json('ok');
        });
	}catch(err){
		log('ERROR: ' + err);
	}
		
})


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/registerguest', (req, res) => {
    
    log('Request made to: /registerguest');
	try{
        var data = req.body;
        
        //Delete old guest row
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


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/geocodeaddress', (req, res) => {
    
    log('Request made to: /geocodeaddress');
	try{
        var data = req.body.data;    
        var state = data.state.toUpperCase();

        //Begin Google Geocoding
        googleMapsClient.geocode({
            address: data.address + ', ' + data.city + ', ' + state,
          }, (err, response) => {
            if (!err) { //Successful GeoCoding
                var longitude = response.json.results[0].geometry.location.lng;
                var latitude = response.json.results[0].geometry.location.lat;
                //Store coords
                dbconn.query('UPDATE EVENTS SET latitude = ?, longitude = ? WHERE eventname = ?', [latitude,longitude, data.eventname], (err, result) => {
                    if(err) throw err;
                    log('GeoCoded event ' + data.eventname);
                    res.json({latitude: latitude, longitude: longitude});
            });
            }
            else{
                log('GeoCoding Error for ' + data.eventname + '\n\t'+err);
                res.json({latitude: 0, longitude: 0});
            }
          });
    }
    catch(err){
        log('ERROR: ' + err);
    }
})

module.exports = router;