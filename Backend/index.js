const log = require('./lib/log').log;
const express = require('express');
const bodyParser = require('body-parser');
var dbconn = require('./sqlConnection');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

log('Session Started');



 
app.use(require('./routes'));

 
app.listen(80)


///////////////
// npm install --save express body-parser
///////////////
