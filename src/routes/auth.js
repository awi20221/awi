const Router = require('express');
const { catchAsync } = require("../middlewares/errors");
const AuthController =require('../controllers/authController');
const passport = require('passport');


function apiAuth() {
    const api = Router();

    api.get('/', AuthController.show);

    api.post('/login', passport.authenticate('local', {session: false}), AuthController.login);

    api.post('/register', AuthController.register);

    return api;
}

module.exports = {apiAuth};