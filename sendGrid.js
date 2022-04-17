// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
//javascript
const { config } = require('./config/config')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(config.apiSendGrid)
const msg = {
  to: 'enderson19952009@gmail.com', // Change to your recipient
  from: config.emailSendGrid, // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js by Omana',
  html: '<strong>and easy to do anywhere, even with Node.js by Omana</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })