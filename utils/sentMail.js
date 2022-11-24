const nodemailer = require("nodemailer");

const sendMail = (message, subject, email) => {
    var transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
               user: process.env.SMTP_EMAIL,
               pass: process.env.SMTP_PASS
           }
       });
       const mailOptions = {
         from: process.env.SMTP_EMAIL, // sender address
         to: email, // list of receivers
         subject: subject, // Subject line
         html: `<p>${message}</p>`// plain text body
       };
       transporter.sendMail(mailOptions, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info);
       });
}

module.exports = sendMail;