/////////////////////////////////////////
// DATABASE CONNECTION AND QUERYER
//
//  - creates connection pool to mysql server
//  - promisifies query function to allow awaits
//  - all database configurations in '../config.js'
////////////////////////////////////////

const mysql = require('mysql');
const sqlConfig = require('../config').sql;
var util = require('util');

//create connection pool
const dbconn = mysql.createPool({
	connectionLimit: sqlConfig.connectionPoolLimit,
	host: sqlConfig.host,
	user: sqlConfig.user,
	password: sqlConfig.password,
	database: sqlConfig.database,
});

//Overwrite getConnection used by query and other functions
//  Overwriten to allow logging of errors
dbconn.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST')
            console.error('Database connection was closed.');
        if (err.code === 'ER_CON_COUNT_ERROR')
            console.error('Database has too many connections.');
        if (err.code === 'ECONNREFUSED')
            console.error('Database connection was refused.');
    }
	if (connection) connection.release();
    return
})

//promosify to allow awaits
dbconn.query = util.promisify(dbconn.query);


module.exports = dbconn;