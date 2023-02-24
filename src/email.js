var nodemailer = require('nodemailer');

function sendEmail(email_to,email_subject,email_text){

      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: "sunilkumarjnvs0551998@gmail.com",
              pass: "sgaijoadzytakyeh"
          },
          tls: {
              rejectUnauthorized: false
          }
      });

      var mailOptions = {
        from: "sunilkumarjnvs0551998@gmail.com",
        to: email_to,
        subject: email_subject,
        text: email_text
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }
  module.exports = {sendEmail};