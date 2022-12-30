const express = require('express');
const authController = require('../controllers/authController');
const passport = require('passport');


function apiAuth() {
    const api = express.Router();

    api.post('/login', passport.authenticate('local', {session: false}), authController.login);

    api.post('/register', authController.register);

    return api;
}

module.exports = {apiAuth};