const express = require('express')
const jwtAuth = require('../middlewares/auth');
const usersController = require('../controllers/usersController');
const {catchAsync} = require("../middlewares/errors");


function apiUsers() {

    const api = express.Router();

    // GET /users/:slug
    api.get('/:slug', catchAsync(usersController.findOne));

    // GET /users/id/:id_
    api.get('/id/:id', catchAsync(usersController.findOneById));

    // GET /users   (only admin)
    api.get('/',jwtAuth.auth, catchAsync(usersController.findAll));

    // PUT /users/update/:slug
    api.put('/update/:slug', catchAsync(usersController.update));   //TODO: jwtAuth -> autoryzacje po stronie serwere nie na front

    // PUT /users/update-password/:slug
    api.put('/update-password/:slug',jwtAuth.auth, catchAsync(usersController.updatePassword));

    // DELETE /users/:slug
    api.delete('/:slug', catchAsync(usersController.remove));   //TODO: jwtAuth

    return api;
}

module.exports = {apiUsers}