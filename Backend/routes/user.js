/////////////////////////////////////////
// 	  /user/	route handler
//
//	- /updatedetails
//	- /loadconstituent
//  - /libraryreq
////////////////////////////////////////

var router = require('express').Router();
var dbconn = require('../lib/sqlConnection');
const log = require('../lib/log').log;
var tokenAuth = require('../lib/tokenAuth');
var bcrypt = require('bcryptjs');

//  - CTX = CONSTITUENTEXPORT

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// ENABLE TOKEN AUTHENTICATION FOR FOLLOWING ROUTES
router.use((req, res, next) => {tokenAuth.checkRequestToken(req, res, next)});



///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/updatedetails', (req, res) => {
    
    log('Request made to: /updatedetails');
	try{
        if(!req.body.data)
            res.status(400).send("400 Bad Request");
            
        var data = req.body.data;
        
        //Remove newest updates from export table CTX if exist (table gets wiped on exporting)
        dbconn.query('DELETE FROM CONSTITUENTEXPORT WHERE id = ?', data.id, (err, result) => {
            //insert new row
            dbconn.query('INSERT INTO CONSTITUENTEXPORT SET ?', data, (err, result) => {
                if(err) throw err;
                log('Updated constituent ' + data.id);
                res.json('ok');
            });

        });
        
	}catch(err){
		log('ERROR: ' + err);
	}
		
})


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/loadconstituent', async(req, res) => {
    
    log('loading constituent');

	try{
        
        //CHECK PASSWORD is supplied (used for entering update details menu)
        //  password is not supplied when app auto logs in
        if(req.body.password && req.body.password != null){
            var err, result = await dbconn.query('SELECT id, passHash FROM APPUSER WHERE id = ('+
                'SELECT id FROM APPUSER WHERE username = ?)', req.body.username);
            if(err) throw err;
            
            const id = result[0].id;
            const passHash = result[0].passHash;

            if(!bcrypt.compareSync(req.body.password, passHash)){
                console.warn('Incorrect password at update details');
                res.json({error: 'Incorrect password'});
                return;
            }else{
                console.warn('Correct Password at update details');
            }
        }

        //CHECK CTX FOR MORE RECENT UPDATES
        var qry = '';
        qry = 'SELECT * FROM CONSTITUENTEXPORT WHERE id = ('+
            'SELECT id FROM APPUSER WHERE username = ?)';
        err, result = await dbconn.query(qry, req.body.username);
        if(err) throw err;
        
        if(result.length > 0){
            res.json(result);
        }
        else{
            //NO CTX ROW, Load from normal constituent table
            qry = 'SELECT * FROM CONSTITUENT WHERE id = ('+
                'SELECT id FROM APPUSER WHERE username = ?)';
            err, result = await dbconn.query(qry, req.body.username);
            if(err) throw err;

            if(result.length > 0)
                res.json(result);
        }

	}catch(err){
		log('ERROR: ' + err);
	}
});



///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/libraryreq', async(req, res) => {
    
    log('Request made to: /libraryreq');
	try{            
        var data = req.body;
        
        //Check already registered
        var qry = 'SELECT id FROM LIBRARYMEMEXPORT WHERE id = ?';
        var err, result = await dbconn.query(qry, data.id);
        if(err) throw err;
        if(result.length > 0){
            res.json({error: 'Already registered'})
            return;
        }

        //create library membership request table
        dbconn.query('INSERT INTO LIBRARYMEMEXPORT SET ?', data, (err, result) => {
            if(err) throw err;
            log('Updated libraryexport ' + data.email);
            res.json('ok');
        });
	}catch(err){
		log('ERROR: ' + err);
	}
		
})

module.exports = router;