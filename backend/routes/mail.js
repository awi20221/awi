const express = require('express')
const mailController = require('../controllers/mailController')


function apiMailSender (){

    const api = express.Router();

    // POST api/mail/send-email
    // sendTo: { ... }
    //In request body we can add one person by login send mail to him/her
    //Adding parameter sendTo : 'ALL' sends message to all register accounts

    api.post('/send-email', mailController.sendTMail)                //TODO: admin only

    // POST api/mail/send-to-awi
    //Available for all logged users to send email from to contact formulae
    //In req.body.text --> 'paste text you want to send'

    api.post('/send-to-awi', mailController.sendContactFormulae)     //TODO: logged users albo i nie !


    return api;
}

module.exports = {apiMailSender}