/////////////////////////////////////////
// SERVER CONFIGURATION FILE
//
//  - token
//  - mysql
//  - temp password reset
//  - email
//  - main server
////////////////////////////////////////

exports.server = {
    port: 80,
}

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
    //maxLength: 6,
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

exports.urlList = {
    magazine: 'https://www.uow.edu.au/alumni/outlook/index.html',
    careers: 'https://careerhub.uow.edu.au/students/login?ReturnUrl=%2f',
    networks: 'https://www.uow.edu.au/alumni/networks/index.html',
    study: 'https://www.uow.edu.au/future/postgrad/index.html',
    scholarships: 'https://www.uow.edu.au/alumni/benefits/postgrad/index.html',
    volunteering: 'https://www.uow.edu.au/alumni/benefits/volunteer/index.html',
    mentoring: 'https://www.uow.edu.au/alumni/benefits/mentoring/index.html',
}