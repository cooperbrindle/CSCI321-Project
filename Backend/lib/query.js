var { dbconn } = require('./sqlConnection');

var querySync = (sqlstr) => {
	dbconn.query(sqlstr, (error, result) => {
		return {error, result};
	})
}

module.exports = querySync;