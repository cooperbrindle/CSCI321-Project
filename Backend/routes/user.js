var router = require('express').Router();
var dbconn = require('../lib/sqlConnection');
const log = require('../lib/log').log;
var tokenAuth = require('../lib/tokenAuth');




///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.use((req, res, next) => {tokenAuth.checkRequestToken(req, res, next)});





///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/updatedetails', (req, res) => {
    
    log(' Request made to: /updatedetails');
	try{
        if(!req.body.data)
            res.status(400).send("400 Bad Request");
            
        var data = req.body.data;
        console.log(data);
        
        dbconn.query('DELETE FROM CONSTITUENTEXPORT WHERE id = ?', data.id, (err, result) => {
            
            console.warn('Okey Dokey');
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

        if((!req.body.username || typeof req.body.username != "string") && (!req.body.id || typeof req.body.id != "string"))
            res.status(400).send("400 Bad Request");
        
        var query = '';
        var err, result;
        //CHECK CTX FOR MORE RECENT UPDATES
        if(req.body.id && req.body.id != ''){
            query = 'SELECT * FROM CONSTITUENTEXPORT WHERE id = ?';
            err, result = await dbconn.query(qry, req.body.id);
        }else {
            qry = 'SELECT * FROM CONSTITUENTEXPORT WHERE id = ('+
            'SELECT id FROM APPUSER WHERE username = ?)';
            err, result = await dbconn.query(qry, req.body.username);
        }
        if(err) throw err;
        if(result.length > 0){
            res.json(result);
        }
        else{
            //NO CTX ROW
            //Load from normal constituent
            if(req.body.id && req.body.id != ''){
                query = 'SELECT * FROM CONSTITUENT WHERE id = ?';
                err, result = await dbconn.query(qry, req.body.id);
            }else {
                qry = 'SELECT * FROM CONSTITUENT WHERE id = ('+
                'SELECT id FROM APPUSER WHERE username = ?)';
                err, result = await dbconn.query(qry, req.body.username);
            }
            if(err) throw err;
            if(result.length > 0)
                res.json(result);
        }

	}catch(err){
		log('ERROR: ' + err);
	}
});

router.post('/libraryreq', (req, res) => {
    
    log(' Request made to: /libraryreq');
	try{            
        var data = req.body;
        console.log(data);
        
        //check ctx row exists and drop
                dbconn.query('DELETE FROM LIBRARYMEMEXPORT WHERE id = ?', data.id, (err, result) => {
                    //insert new row
                    dbconn.query('INSERT INTO LIBRARYMEMEXPORT SET ?', data, (err, result) => {
                        if(err) throw err;
                        log('Updated libraryexport ' + data.email);
                        res.json('ok');
                    });

                });
	}catch(err){
		log('ERROR: ' + err);
	}
		
})

router.post('/registerConst', (req, res) => {
    
    log(' Request made to: /registerConst');
	try{
        var data = req.body;
        console.log(data);
        
        //check ctx row exists and drop
                
                dbconn.query('DELETE FROM EVENTCONSTITUENT WHERE id = ? AND eventname = ?',[data.id, data.eventname], (err, result) => {
                    //insert new row
                    dbconn.query('INSERT INTO EVENTCONSTITUENT SET ?', data, (err, result) => {
                        if(err) throw err;
                        log('Updated eventconstituent ' + data.eventname + ' ' + data.id);
                        res.json('ok');
                    });

                });
	}catch(err){
		log('ERROR: ' + err);
	}
		
})

module.exports = router;