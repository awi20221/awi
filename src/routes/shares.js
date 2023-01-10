const express = require('express');
const sharesController = require('../controllers/sharesController')
const jwtAuth = require('../middlewares/auth');
const {catchAsync} = require('../middlewares/errors')

function apiShares() {
    const api = express.Router();

    // GET api/shares/  (admin only risky operation)
    api.get('/',catchAsync(sharesController.findAll)) //,jwtAuth.auth //TYMCZASOWA ZMIANA!

    // GET api/shares/:name
    api.get('/name/:name', catchAsync(sharesController.findOneCompany))

    // GET api/shares/:effectiveDate{YYYY-MM-DD}
    api.get('/effectiveDate/:effectiveDate', catchAsync(sharesController.findAllByDay))

    // GET api/shares/:effectiveDate{YYYY-MM-DD}/:name
    api.get('/:effectiveDate/:name', catchAsync(sharesController.findOneByDay))


    // GET api/shares/update-time
    api.get('/update-time', catchAsync(sharesController.getUpdateDate))

    // GET api/shares/update-shares/:path-to-local-file {path to file downloaded from https://www.gpw.pl/archiwum-notowan on your local computer}
    //if :path-to-local-file === null, request will search download directory on your computer to find any .csv/ .xls files which have specific name

    api.get('/update-shares', jwtAuth.auth ,catchAsync(sharesController.update))

    return api;
}

module.exports = {apiShares};