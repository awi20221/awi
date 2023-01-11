const express = require('express')
const jwtAuth = require('../middlewares/auth');
const usersController = require('../controllers/usersController');
const {catchAsync} = require("../middlewares/errors");


function apiUsers() {

    const api = express.Router();

    // GET /users/:slug
    api.get('/:slug', catchAsync(usersController.findOne));

    // GET /users   (only admin)
    api.get('/',jwtAuth.auth, catchAsync(usersController.findAll));

    // PUT /users/:slug
    api.put('/:slug',jwtAuth.auth, catchAsync(usersController.update));

    // PUT /users/update-password/:slug
    api.put('/update-password/:slug',jwtAuth.auth, catchAsync(usersController.updatePassword));

    // DELETE /users/:slug
    api.delete('/:slug',jwtAuth.auth, catchAsync(usersController.remove));

    return api;
}

module.exports = {apiUsers}