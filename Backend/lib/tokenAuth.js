/////////////////////////////////////////
// TOKEN BASED AUTHENTICATION LIBRARY
//      JWT (JSON WEB TOKEN)
//
//  - used to create and verify tokens for users
//   to authenticate to backend REST API
////////////////////////////////////////

var dbconn = require('./sqlConnection');
var jwt = require('jsonwebtoken');
const log = require('./log').log;
const tokenConfig = require('../config').token;

exports.createToken = (payload) => {
    var token = jwt.sign(payload, tokenConfig.tokenSecret, { 
                        //expiresIn: config.defaultTokenExpiry,
                        issuer: tokenConfig.issuer,
                    });
    return token;
}

//VERIFIES TOKEN
exports.verifyToken = async(token) => {
    try{
    var decoded = await jwt.verify(token, tokenConfig.tokenSecret, {issuer: tokenConfig.issuer})
        return '';
    }catch(err){
        console.log(err.name + ':\n\n' + err.message);
        return err.name;
    }
}

//Express router middleware function to verify token
exports.checkRequestToken = async(req, res, next) => {
    // check header or url parameters or post parameters for token
	var token = req.headers['authorization'];
	// decode token
	if (token) {
        var err = await this.verifyToken(token);
		if(err && err != ''){
            //console.log(err);
			res.json({error: err});
        }else next();
	} else {
	  // if there is no token
	  // return an error
	  return res.status(403).send({ 
		  error: 'No token provided.' 
	  });
  
	}
  }