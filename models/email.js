var nodemailer = require('nodemailer');

const {google} = require('googleapis');

// const credentials = {
//         "email_Id": "luftekengineering@gmail.com",
//         "client_id": "1045266564754-58uqg6psgb06ooth8ladjrsu8e0v2r5o.apps.googleusercontent.com",
//         "project_id": "workflow-luftek",
//         "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//         "token_uri": "https://oauth2.googleapis.com/token",
//         "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//         "client_secret": "PndDFI1OQTBz1_xcwXcQSizD",
//         "redirect_uris": ["https://developers.google.com/oauthplayground"],
//         "refresh_token": "1//040BWheJHI6ZBCgYIARAAGAQSNwF-L9IrZ22JPEee_RN-ZeZaGraFQ00sDP3-xPJVkoqzVcXjG0a1lJ2G3prc85bTMeL0oKdydMo"
// }

// const oAuth2Client = new google.auth.OAuth2(credentials.client_id, credentials.client_secret, credentials.redirect_uris);

// oAuth2Client.setCredentials({
//     refresh_token: credentials.refresh_token
// });

// //8870512923 - anbu airtel

// const accessToken = oAuth2Client.getAccessToken();

// var gmail = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         type: 'OAuth2', 
//         user: credentials.email_Id,
//         clientId: credentials.client_id,
//         clientSecret: credentials.client_secret,
//         refreshToken: credentials.refresh_token,
//         accessToken: accessToken,
//         pass: 'Dio__109'
//     },
//     tls:{
//         rejectUnauthorized: false,
//     }
// });

// var zohomail = nodemailer.createTransport({
//     host: 'smtp.zoho.in',
//         port: 465,
//         secure: true, // use SSL
//         auth: {
//             user: 'luftek@zohomail.in',
//             pass: 'Dio__109'
//         }
// });

// var a2Email = nodemailer.createTransport({
//     host: 'mail.pruebasolutions.com',
//         port: 465,
//         secure: true, // use SSL
//         auth: {
//             user: 'hablu@pruebasolutions.com',
//             pass: 'Dio__109'
//         }
// });



// module.exports = {
//     gmail,
//     zohomail,
//     a2Email
// }