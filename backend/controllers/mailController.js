const {tTransporter} = require('../config/tmail')
const authController = require('../controllers/authController')
const User = require('../models/user').userModel

async function setLaunchMailOptions(registeredEmail) {
    return {
        from: '"AWI 👻", <awi20221@t.pl>',
        to: registeredEmail,
        subject: '🚀 Your awi launch verification',
        html: ''
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

async function setContactFormulaeMailOptions(subject,text) {
    return {
        from: '"Contact formulae", <awi20221@t.pl>',
        to: 'awi2022.1.0@gmail.com',
        subject: subject,
        text: text
    }
}


/**
 * Enables to send mail from the server without using axios, it is for register purposes
 */

function sendLaunchTServerMail(registeredEmail) {
    tTransporter.sendMail(setLaunchMailOptions(registeredEmail), (err, info) => {
        if (err) {
            return console.log(err);
        }
        console.log('Wiadomosc z potwierdzeniem rejestracji %s wysłana %s', info.messageId, info.response)
    })
}
/**
 * Enables to send any mail by administrator to any user with using axios
 */
async function sendTMail(req,res,next) {
    // if(await authController.verifyIfAdmin(req,res,next)) {
        await tTransporter.sendMail(await setAdminMailOptions(req.body.userNames, req.body.subject, req.body.text), (err) => {
            if (err) {
                return res.status(200).send('Cannot sendTMail ', err);
            }
            return res.status(200).send('Wiadomość została wysłana');
        })
    // }
    // return res.status(200).send("Available for admin only");
}

/**
 * Enables to send mail by user to administrator from contact formulae on HELP page
 */
async function sendContactFormulae(req,res,next) {
    await tTransporter.sendMail(await setContactFormulaeMailOptions(req.body.subject, req.body.text), (err) => {
        if (err) {
            return res.status(200).send('Cannot send contact formulae ', err);
        }
        return res.status(200).send('Wiadomość została wysłana');
    })
}

module.exports = {sendTMail, sendLaunchTServerMail, sendContactFormulae}