var router = require('express').Router();
var dbconn = require('../lib/sqlConnection');
const log = require('../lib/log').log;
var tokenAuth = require('../lib/tokenAuth');
var bcrypt = require('bcryptjs');
var passwordConfig = require('../config').tempPassword;
//var emailer = require('../lib/emailer');

const saltRounds = 10;


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/login', async(req, res) => {
	log(' Request made to: /login');
	
	try{
	if(!req.body.username || typeof req.body.username != "string"){
		res.status(400).send("400 Bad Request");
		return;
	}
    if(!req.body.password || typeof req.body.password != "string"){
		res.status(400).send("400 Bad Request");
		return;
	}
    
    const sentUsername = req.body.username;
	const sentPassword = req.body.password;
	const qry = 'SELECT username, passHash FROM APPUSER WHERE username = ?';
	
	dbconn.query(qry, sentUsername, (err, result, fields) => {
		
		if(err) throw err;
        if(result.length > 1) throw 'MORE THAN ONE USER FOUND';
		

        if(result.length < 1 || sentUsername != result[0].username){
			//return no user found error
			console.warn('NO USER FOUND');
			res.json({error: 'No user found'});
			return;
		}
		var errorMsg = '', token = '';
		if(!bcrypt.compareSync(sentPassword, result[0].passHash)){
			console.warn('Incorrect password');
			errorMsg = 'Incorrect username or password';
		}else{
			console.warn('Correct Password');
			errorMsg = '';
			token = tokenAuth.createToken({
				id: result[0].id
			})
		}

		res.json({error: errorMsg, token: token});
	});
	}catch(err){
		log('ERROR: ' + err);
	}
		
})






///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/signUp', async(req, res) => {
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

	var err, result1 = await dbconn.query(qry);
	if(err) throw err;
	
	var errorMsg = '';
	if(result1.length != 1){
		if(result1.length > 1)
			errorMsg = 'Too many users';
		if(result1.length < 1)
			errorMsg = 'No Match Found';
		
		res.json({error: errorMsg});
		return;
	}
	
	//check if already a user
	qry = 'SELECT * FROM APPUSER WHERE id = \'' + result1[0].id + '\'';
	dbconn.query(qry, (err, result2) => {
		if(err) throw err;
		if(result2.length > 0)
			errorMsg = 'Already a user';
		//resolve
		res.json({error: errorMsg, data: result1[0]});
	});

	}catch(err){
		log('ERROR: ' + err);
	}
		
})






///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/register', async(req, res) => {
	log(' Request made to: /register');

	try{

	var qry = 'SELECT username FROM APPUSER WHERE username = ?';
	var err, result = await dbconn.query(qry, req.body.username);
	if(err) throw err;
	console.log('USERS FOUND: ' + result.length);
	if(result.length > 0){
		res.json({error: 'username already exists'})
		return;
	}
    
	var salt = bcrypt.genSaltSync(saltRounds);
	var hash = bcrypt.hashSync(req.body.passHash, salt);
	req.body.passHash = hash;
	
	qry = 'INSERT INTO APPUSER SET ?';

	
	dbconn.query(qry, req.body, (err, result1) => {
		if(err) throw err;
		res.json('ok');
	});
	}catch(err){
		log('ERROR: ' + err);
	}
		
})


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/resetpassword', async(req, res) => {
	log(' Request made to: /resetpassword');

	try{

	var qry = 'SELECT id FROM APPUSER WHERE id = (' + 
				'SELECT id FROM CONSTITUENT WHERE email = ? AND firstName = ? AND lastName = ?)';

	var err, result = await dbconn.query(qry, [req.body.email, req.body.firstName, req.body.lastName]);
	
	if(err) throw err;
	if(result.length < 1 || result.length > 1){
		console.log('NO MATCH');
		res.json({error:'no match'});
		return;
	}
	var id = result[0].id;

	//CREATE TEMP PASSWORD
	var password = '';
	for(i=0; i < passwordConfig.maxLength; i++){
		password += passwordConfig.possible[Math.floor((Math.random() * passwordConfig.possible.length))];
	}
	console.log('TEMP PASSWORD: ' + password);

	var salt = bcrypt.genSaltSync(saltRounds);
	var hash = bcrypt.hashSync(password, salt);

	//SEND EMAIL
	// emailer.sendPassword(password, req.body.email)
	// .then((info)=>{
	// 	//UPDATE TEMP PASSWORD IN DB
	// 	qry = 'UPDATE APPUSER SET passHash = ? WHERE id = ?';
	// 	dbconn.query(qry, [hash, id], (err, result1) => {
	// 		if(err) throw err;
	// 		res.json('ok');
	// 	});
	
	// }).catch((error)=>{
	// 	console.log('EMAIL FAILED');
	// 	res.json({error: error});
	// 	return;
	// })
	

	}catch(err){
		log('ERROR: ' + err);
	}
		
})

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.use((req, res, next) => {tokenAuth.checkRequestToken(req, res, next)});





///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/updatepassword', async(req, res) => {
	log(' Request made to: /updatepassword ');

	try{
	if(!req.body.newPassword || typeof req.body.newPassword != "string"){
		res.status(400).send("400 Bad Request");
		return;
	}
	
	errorMsg = '';
	
	var err, result = await dbconn.query('SELECT passHash FROM APPUSER WHERE id = ?', req.body.id);
	if(err) throw err;

	if(!bcrypt.compareSync(req.body.oldPassword, result[0].passHash)){
		res.json({error: 'Old password does not match'});
		return;
	}

	var salt = bcrypt.genSaltSync(saltRounds);
	var hash = bcrypt.hashSync(req.body.newPassword, salt);
	
	dbconn.query('UPDATE APPUSER SET passHash = ? WHERE id = ?', [hash, req.body.id], (err, result) => {
		if(err) throw err;
		res.json({error: errorMsg});
	});
	
	}catch(err){
		log('ERROR: ' + err);
	}
		
})


module.exports = router;