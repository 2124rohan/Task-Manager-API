const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
    process.env.Mailjet_API_Key,
    process.env.Mailjet_Secret_Key
);

const sendWelcomeEmail = (email, name1) => {
  mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: "rohanvishwakarma0149@gmail.com",
            // Name: "Mailjet Pilot"
          },
          To: [
            {
              Email: email,

            }
          ],
          Subject: "Thanks For Joining In!",
          TextPart: `Welcome to the app, ${name1}.`,
        }
      ]
    })
}

const sendRemoveEmail = (email, name1) => {
  mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: "rohanvishwakarma0149@gmail.com",
          },
          To: [{
            Email: email,
          }],
          Subject: "Account Deleted!",
          TextPart: `GoodBye, ${name1}`
        }
      ]
    })
}

module.exports = {
  sendWelcomeEmail,
  sendRemoveEmail
}