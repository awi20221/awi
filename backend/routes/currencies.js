const express = require('express');
const currenciesController = require('../controllers/currenciesController');
const {catchAsync} = require('../middlewares/errors')
const jwtAuth = require('../middlewares/auth');


//udostępnianie pobranych danych zapisanych w DB poprzez api
function apiCurrencies() {
    const api = express.Router();

    // GET api/currencies/  (only admin)
    api.get('/', jwtAuth.auth ,catchAsync(currenciesController.findAll))

    // GET api/currencies/code/:code
    api.get('/code/:code',catchAsync(currenciesController.findOne))

    // GET api/currencies/effectiveDate/:effectiveDate{YYYY-MM-DD}
    api.get('/effectiveDate/:effectiveDate' ,catchAsync(currenciesController.findAllByDay))

    // GET api/currencies/:effectiveDate{YYYY-MM-DD}/:code
    api.get('/:effectiveDate/:code',catchAsync(currenciesController.findOneByDay))

    // GET api/currencies/update-time
    api.get('/update-time', catchAsync(currenciesController.getUpdateDate))

    // GET api/currencies/update-currencies     (only admin)
    api.get('/update-currencies',jwtAuth.auth, catchAsync(currenciesController.update))

    // GET api/currencies/fetch-old-data        (only admin)
    api.get('/fetch-old-data',jwtAuth.auth, catchAsync(currenciesController.fetchOldData))

    return api;
}

module.exports = {apiCurrencies};