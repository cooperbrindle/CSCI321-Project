var { dbconn } = require('./sqlConnection');

var queryAsync = (sqlstr) => {
	dbconn.query(sqlstr, (error, result) => {
		return {error, result};
	})
}

module.exports = queryAsync;