var router = require('express').Router();
var dbconn = require('../sqlConnection');
const log = require('../lib/log').log;
var bcrypt = require('bcryptjs');

const saltRounds = 10;


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/login', (req, res) => {
	log(' Request made to: /login');

	try{
	if(!req.body.username || typeof req.body.username != "string")
		res.status(400).send("400 Bad Request");
    if(!req.body.password || typeof req.body.password != "string")
		res.status(400).send("400 Bad Request");
    
    const sentUsername = req.body.username;
	const sentPassword = req.body.password;

	dbconn.query('SELECT username, passHash FROM APPUSER WHERE username = \'' + sentUsername + '\'', (err, result, fields) => {
		
		if(err) throw err;
        if(result.length > 1) throw 'MORE THAN ONE USER FOUND';
		

        if(result.length < 1 || sentUsername != result[0].username){
			//return no user found error
			console.warn('NO USER FOUND');
			res.json({error: 'No user found'});
			return;
		}
		var errorMsg = '';
		if(sentPassword != result[0].passHash){
			console.warn('Incorrect password');
			errorMsg = 'Incorrect username or password';
		}else{
			console.warn('Correct Password');
			errorMsg = ''
		}
		
		res.json({error: errorMsg});
	});
	}catch(err){
		log('ERROR: ' + err);
	}
		
})


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/loadconstituent', (req, res) => {
	log('loading constituent');
	try{
	if(!req.body.username || typeof req.body.username != "string")
		res.status(400).send("400 Bad Request");
	const qry = 'SELECT * FROM CONSTITUENT WHERE CnBio_ID = ('+
			'SELECT CnBio_ID FROM APPUSER WHERE username = \'' + req.body.username + '\')';

	dbconn.query(qry, (err, result, fields) => {
		if(err) throw err;

		res.json(result);
	});
	
	
	}catch(err){
		log('ERROR: ' + err);
	}
});

module.exports = router;