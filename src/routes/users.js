const express = require('express')
// const jwtAuth = require('../middlewares/auth').auth();
const usersController = require('../controllers/usersController');
const {catchAsync} = require("../middlewares/errors");


function apiUsers() {

    const api = express.Router();

    //TODO: umożliwić niektóre rzeczy tylko dla administratorów --> nowy middleware

    // GET /users/:slug
    api.get('/:slug', catchAsync(usersController.findOne));

    // GET /users
    api.get('/', catchAsync(usersController.findAll));

    // PUT /users/:slug
    api.put('/:slug', catchAsync(usersController.update));

    // DELETE /users/:slug
    api.delete('/:slug', catchAsync(usersController.remove));

    return api;
}

module.exports = {apiUsers}