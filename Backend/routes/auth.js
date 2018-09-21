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
			errorMsg = '';
		}
		
		res.json({error: errorMsg});
	});
	}catch(err){
		log('ERROR: ' + err);
	}
		
})


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/signUp', (req, res) => {
	log(' Request made to: /signUp');

	try{
	if(!req.body.data)
		res.status(400).send("400 Bad Request");
    
	var data = req.body.data;
	console.log(data);
	var numqry = '', fnqry = '', lnqry = '', emailqry = '', bdqry = '';
	var qry = 'SELECT * FROM CONSTITUENT WHERE ';

	//search by student number
	if(data.stdNum && data.stdNum != '')
		numqry = 'stdNum = \'' + data.stdNum + '\'';
	if(data.email && data.email != '')
		emailqry = 'email = \'' + data.email + '\'';
	if(data.firstName && data.firstName != '')
		fnqry = 'firstName = \'' + data.firstName + '\'';
	if(data.lastName && data.lastName != '')
		lnqry = 'lastName = \'' + data.lastName + '\'';
	if(data.birthDate && data.birthDate!= '')
		bdqry = 'birthDate = \'' + data.birthDate + '\'';
	
	var hasBefore = false
	if(numqry != ''){
		hasBefore = true;
		qry += numqry;
	}
	if(fnqry != ''){
		if(hasBefore) qry += ' && ';
		else hasBefore = true;
		qry += fnqry;
	}
	if(lnqry != ''){
		if(hasBefore) qry += ' && ';
		else hasBefore = true;
		qry += lnqry;
	}
	if(emailqry != ''){
		if(hasBefore) qry += ' && ';
		else hasBefore = true;
		qry += emailqry;
	}
	if(bdqry != ''){
		if(hasBefore) qry += ' && ';
		else hasBefore = true;
		qry += bdqry;
	}
	
	console.log(qry);

	dbconn.query(qry, (err, result1) => {
		if(err) throw err;
		
		var errorMsg = '';
		if(result1.length > 1)
			errorMsg = 'Too many users';
		if(result1.length < 1)
			errorMsg = 'No Match Found';
		if(result1.length == 1)
			errorMsg = '';
		
		//check if already a user
		qry = 'SELECT * FROM APPUSER WHERE id = \'' + result1[0].id + '\'';
		dbconn.query(qry, (err, result2) => {
			if(err) throw err;
			if(result2.length > 0)
				errorMsg = 'Already a user';
			//resolve
			res.json({error: errorMsg, data: result1[0]});
		});

	});
	}catch(err){
		log('ERROR: ' + err);
	}
		
})






///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/register', (req, res) => {
	log(' Request made to: /register');

	try{
	if(!req.body.email || !req.body.password || !req.body.id)
		res.status(400).send("400 Bad Request");
    
	
	var qry = 'INSERT INTO APPUSER VALUES (\'' + req.body.id + '\', \'' + req.body.email + '\', \'' + req.body.password + '\')';

	//TODO: hash password
	dbconn.query(qry, (err, result1) => {
		if(err) throw err;
		res.json('ok');
		

	});
	}catch(err){
		log('ERROR: ' + err);
	}
		
})


module.exports = router;