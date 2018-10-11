exports.token = {
    tokenSecret: 'alumniApp',
    defaultTokenExpiry: '1d',
    issuer: 'UOWAlumni',
}

exports.sql = {
    connectionPoolLimit: 50,
    host: 'localhost',
    user: "cooperb",
    password: "Balotelli45",
    database: 'alumniapp'
}

exports.tempPassword = {
    //possible: 'abcdefghijklmnopqrstuvwxyz1234567890',
    //maxLength: 10,
    possible: 'abc',
    maxLength: 3,
}

exports.email = {
    host: 'smtp.telstra.com',
    post: '465',
    auth: {
        user: '',
        pass: '',
    },
    from: '',

}