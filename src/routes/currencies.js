const express = require('express');
const currenciesController = require('../controllers/currenciesController');
const {catchAsync} = require('../middlewares/errors')
const jwtAuth = require('../middlewares/auth');


//udostępnianie pobranych danych zapisanych w DB poprzez api
function apiCurrencies() {
    const api = express.Router();

    // GET api/currencies/
    api.get('/', jwtAuth.auth ,catchAsync(currenciesController.findAll))

    // GET api/currencies/:code
    api.get('/code/:code',catchAsync(currenciesController.findOne))

    // GET api/currencies/:effectiveDate{YYYY-MM-DD}
    api.get('/effectiveDate/:effectiveDate' ,catchAsync(currenciesController.findAllByDay))

    // GET api/currencies/:effectiveDate{YYYY-MM-DD}/:code
    api.get('/:effectiveDate/:code',catchAsync(currenciesController.findOneByDay))

    // GET api/currencies/update-time
    api.get('/update-time', catchAsync(currenciesController.getUpdateDate))

    //TODO: admin only: run fetchOldDate, getUpdate functions --> Heroku offers scheduler as node-cron but not for free that is why we implement it as http request

    // GET api/currencies/update-currencies
    api.get('/update-currencies', catchAsync(currenciesController.update))

    // GET api/currencies/fetch-old-data
    api.get('/fetch-old-data', catchAsync(currenciesController.fetchOldData))

    return api;
}

module.exports = {apiCurrencies};