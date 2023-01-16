const {tTransporter} = require('../config/tmail')
const User = require('../models/user').userModel
const config = require('../config/config')
const authController = require('./authController')

async function setLaunchMailOptions(registeredEmail, login) {
    let url = config.configValues.serverURL + '/api/auth/activate-account/' + login
    return {
        from: '"AWI 👻", <awi20221@t.pl>',
        to: registeredEmail,
        subject: '🚀 Your awi launch verification',
        html: "<h3>Informacje</h3>" +
            "<p>Dziękujemy za utworzenie konta na naszej stronie. Poniżej znajdziesz link aktywacyjny.</p>" +
            "<h4>Aktywacja konta</h4>" +
            "<p>Aby aktywować konto kliknij: " + url +
            "<h3><p>AWI App Team &copy; 2023 🚀</p></h3>"
    }
}

//in body variable userName only can be: 'ALL' or single name
async function getEmailsFromDB(userName) {
    let foundedEmails
    if (userName === 'ALL') {
        foundedEmails = await User.find({}, 'email')
    }
    else{
        foundedEmails = await User.find({login: userName}, 'email')
    }
    return foundedEmails;
}



async function setAdminMailOptions(userNames,subject,text) {
    let toEmails;
    let to = ''
    toEmails = await getEmailsFromDB(userNames);

    if(toEmails.length !== 1 && toEmails.length !== 0){
        for (let i = 0; i < toEmails.length; i++) {
            if(i !== toEmails.length - 1) {
                to += toEmails[i].email + ', ';
            }
            else {
                to += toEmails[i].email
            }
        }
    }
    else{
        to = toEmails[0].email
    }

    return {
        from: '"AWI Administration👻", <awi20221@t.pl>',
        to: to,
        subject: subject,
        text: text
    }
}

async function setContactFormulaeMailOptions(text, email) {
    return {
        from: '"AWI HELP", <awi20221@t.pl>',
        to: 'awi2022.1.0@gmail.com',
        subject: 'AWI HELP ' + email,
        text: text
    }
}


/**
 * Enables to send mail from the server without using axios, it is for register purposes
 */

async function sendLaunchTServerMail(registeredEmail, login) {
    await tTransporter.sendMail(await setLaunchMailOptions(registeredEmail,login), (err, info) => {
        if (err) {
            return console.log('sendLaunchTServerMail: ', err);
        }
        console.log('Wiadomosc z potwierdzeniem rejestracji %s wysłana %s', info.messageId, info.response)
    })
}

/**
 * Enables to send any mail by administrator to any user with using axios
 */
async function sendTMail(req,res,next) {
    if(await authController.verifyIfAdmin(req,res,next)) {
        await tTransporter.sendMail(await setAdminMailOptions(req.body.userNames, req.body.subject, req.body.text), (err) => {
            if (err) {
                return res.status(400).send('Cannot sendTMail ', err);
            }
            return res.status(200).send('Wiadomość została wysłana');
        })
    }
    return res.status(401).send("Available for admin only");
}

/**
 * Enables to send mail by user to administrator from contact formulae on HELP page
 */
async function sendContactFormulae(req,res,next) {
    await tTransporter.sendMail(await setContactFormulaeMailOptions(req.body.text, req.body.email), (err) => {
        if (err) {
            return res.status(401).send('Cannot send contact formulae ', err);
        }
        return res.status(200).send('Wiadomość została wysłana');
    })
}

module.exports = {sendTMail, sendLaunchTServerMail, sendContactFormulae}