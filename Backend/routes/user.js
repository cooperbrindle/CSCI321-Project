var router = require('express').Router();
var dbconn = require('../sqlConnection');
const log = require('../lib/log').log;


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/updatedetails', (req, res) => {
    
    log(' Request made to: /updatedetails');
	try{
        if(!req.body.data || typeof req.body.username != "string")
            res.status(400).send("400 Bad Request");
            
        var data = req.body.data;
        
        //check ctx row exists and drop
        await dbconn.query('SELECT CnBio_ID FROM CONSTITUENT WHERE CnBio_ID = \'' + data.CnBio_ID + '\'', (err, result) => {
            if(err) return;
            if(result.length > 0)
                await dbconn.query('DELETE FROM CONSTITUENT WHERE CnBio_ID = \'' + data.CnBio_ID + '\'', (err, result) => {});
        });
        
        console.warn('Okey Dokey');
        //insert new row
        dbconn.query('INSERT INTO CONSTITUENT SET ?', data, (err, result) => {
            if(err) throw err;
            log('Updated constituent ' + data.CnBio_ID);
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

        if((!req.body.username || typeof req.body.username != "string") && (!req.body.id || typeof req.body.id != "string"))
            res.status(400).send("400 Bad Request");
        
        const query = '';
        
        //CHECK CTX FOR MORE RECENT UPDATES
        if(req.body.id && req.body.id != '')
            query = 'SELECT * FROM CONSTITUENTEXPORT WHERE CnBio_ID = \'' + id + '\'';
        else {
            qry = 'SELECT * FROM CONSTITUENTEXPORT WHERE CnBio_ID = ('+
            'SELECT CnBio_ID FROM APPUSER WHERE username = \'' + req.body.username + '\')';
        }
        
        await dbconn.query(qry, (err, result) => {
            if(err) throw err;
            if(result.length > 0)
                res.json(result);
            return;
        });

        //return if response already sent
        if(res.headersSent)
            return;
        
        //Load from normal constituent
        if(req.body.id && req.body.id != '')
            query = 'SELECT * FROM CONSTITUENT WHERE CnBio_ID = \'' + id + '\'';
        else {
            qry = 'SELECT * FROM CONSTITUENT WHERE CnBio_ID = ('+
            'SELECT CnBio_ID FROM APPUSER WHERE username = \'' + req.body.username + '\')';
        }
        
        await dbconn.query(qry, (err, result) => {
            if(err) throw err;
            if(result.length > 0)
                res.json(result);
            return;
        });


	}catch(err){
		log('ERROR: ' + err);
	}
});

module.exports = router;