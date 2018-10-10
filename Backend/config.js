exports.tokenConfig = {
    tokenSecret: 'alumniApp',
    defaultTokenExpiry: '1d',
    issuer: 'UOWAlumni',
}

exports.sqlConfig = {
    connectionPoolLimit: 50,
    host: 'localhost',
    user: "cooperb",
    password: "Balotelli45",
    database: 'alumniapp'
}

exports.passwordResetConfig = {
    possible: 'abcdefghijklmnopqrstuvwxyz1234567890',
    maxLength: 10,
}