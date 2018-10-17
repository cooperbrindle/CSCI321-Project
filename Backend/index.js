/////////////////////////////////////////
// INITIAL NODE SERVER FILE
//
//  - Node express web framework
//  - REST API used for alumni mobile app backend
//  - mysql database
//
// SOURCES:
//  - Express: https://expressjs.com/
//  - mysql: 
//  - Body Parser: https://www.npmjs.com/package/body-parser
//  - 
////////////////////////////////////////

const log = require('./lib/log').log;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config').server;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

log('\n\n**Session Started**\n');

//Apply all routes to express app
app.use(require('./routes'));

//initiate listener
app.listen(config.port);