/////////////////////////////////////////
// Email library
//
// Current Funtionality
//  - send reset password
//
// all email configurations in '../config.js'
////////////////////////////////////////

const nodemailer = require('nodemailer');
const emailConfig = require('../config').email;
const log = require('../lib/log').log;
var util = require('util');

////////////////////////////////////////////////////////////
// TESTING EMAIL ACCOUNT
//  doesn't actually send the email
var account;
var transporter;
nodemailer.createTestAccount((err, acc) => {
    if(err)console.log('TEST EMAIL ERROR: '+err);
    console.log('Emailer ready.');
    account = acc;
    
    transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: emailConfig.port,
        secure: false, // true for 465, false for other ports
        auth: {
            user: acc.user,
            pass: acc.pass,
        },
    });
});
////////////////////////////////////////////////////////////

// Real email account
// transporter = nodemailer.createTransport({
//     host: emailConfig.host,
//     port: emailConfig.port,
//     secure: true, // true for 465, false for other ports
//     auth: emailConfig.auth,
// });


//Sends new password to supplied email
exports.sendPassword = (password, email) => {
    return new Promise((resolve, reject) => {
        if(!transporter || transporter == null){console.log('transporter is null');return;}

        //Email body
        var message = 'Temporary password: ' + password +
            '\nPlease reset your password after logging in.';
        
        //Email options
        let mailOptions = {
            from: emailConfig.from, // sender address
            to: email, // list of receivers
            subject: 'UOW Alumni password reset', // Subject line
            text: message, // plain text body
            html: '<p>'+message+'</p>' // html body
        };

        // send mail with defined transport object
        log('Sending email to ' + email);
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                reject(error);
                return;
            }
            log('Email sent to '+ email);
            resolve(info);
        });
    });
}
