const express = require('express');
const currenciesController = require('../controllers/currenciesController');
const {catchAsync} = require('../middlewares/errors')

//udostępnianie pobranych danych zapisanych w DB poprzez api
function apiCurrencies() {
    const api = express.Router();

    // GET api/currencies/
    api.get('/',currenciesController.checkIfUpdateFromRemoteAvailable ,catchAsync(currenciesController.findAll))

    // GET api/currencies/:slug
    api.get('/:slug',catchAsync(currenciesController.findOne))

    // GET api/currencies/update-time
    api.get('/update-time')


    return api;
}

module.exports = {apiCurrencies};