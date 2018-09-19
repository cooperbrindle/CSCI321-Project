var router = require('express').Router();
var dbconn = require('../sqlConnection');
const log = require('../lib/log').log;


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
/*router.post('/updatedetails', (req, res) => {
    
    log(' Request made to: /updatedetails');
	try{
        if(!req.body.data || typeof req.body.username != "string")
            res.status(400).send("400 Bad Request");
            
        var data = req.body.data[0];
        
        //check ctx row exists and drop
        await dbconn.query('SELECT id FROM CONSTITUENTEXPORT WHERE id = \'' + data.id + '\'', (err, result) => {
            if(err) return;
            if(result.length > 0)
                await dbconn.query('DELETE FROM CONSTITUENTEXPORT WHERE id = \'' + data.id + '\'', (err, result) => {});
        });
        
        console.warn('Okey Dokey');
        //insert new row
        dbconn.query('INSERT INTO CONSTITUENTEXPORT SET ?', data, (err, result) => {
            if(err) throw err;
            log('Updated constituent ' + data.id);
        });
        
	}catch(err){
		log('ERROR: ' + err);
	}
		
})*/


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
router.post('/loadconstituent', (req, res) => {
    
    log('loading constituent');
    noCTX = true;

	try{

        if((!req.body.username || typeof req.body.username != "string") && (!req.body.id || typeof req.body.id != "string"))
            res.status(400).send("400 Bad Request");
        
        const query = '';
        
        //CHECK CTX FOR MORE RECENT UPDATES
        if(req.body.id && req.body.id != '')
            query = 'SELECT * FROM CONSTITUENTEXPORT WHERE id = \'' + req.body.id + '\'';
        else {
            qry = 'SELECT * FROM CONSTITUENTEXPORT WHERE id = ('+
            'SELECT id FROM APPUSER WHERE username = \'' + req.body.username + '\')';
        }
        
        dbconn.query(qry, (err, result) => {
            if(err) throw err;
            if(result.length > 0){
                res.json(result);
            }
            else{
                //NO CTX ROW
                //Load from normal constituent
                if(req.body.id && req.body.id != '')
                    query = 'SELECT * FROM CONSTITUENT WHERE id = \'' + req.body.id + '\'';
                else {
                    qry = 'SELECT * FROM CONSTITUENT WHERE id = ('+
                    'SELECT id FROM APPUSER WHERE username = \'' + req.body.username + '\')';
                }
                
                dbconn.query(qry, (err, result) => {
                    if(err) throw err;
                    if(result.length > 0)
                        res.json(result);
                    return;
                });
            }
        });



	}catch(err){
		log('ERROR: ' + err);
	}
});

module.exports = router;