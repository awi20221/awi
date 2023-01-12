const express = require('express');
const authController = require('../controllers/authController');
const passport = require('passport');


function apiAuth() {
    const api = express.Router();

    /**
     * middleware passport.authenticate przyjmuje nazwę strategi, 'local' oznacza, że jest to nasza własna zdefiniowana strategia,
     * domyślnie działa na sesjach, my natomiast będziemy posługiwać się tkoenami jws dlatego parametr session: false
     */

    api.post('/login', passport.authenticate('local', {session: false}), authController.login);

    api.post('/register', authController.register);

    //POST api/auth/activate-account/:login (link generated in activate email)
    api.get('/activate-account/:login', authController.activateAccount);

    return api;
}

module.exports = {apiAuth};