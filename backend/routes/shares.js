const express = require('express');
const sharesController = require('../controllers/sharesController')
const jwtAuth = require('../middlewares/auth');
const {catchAsync} = require('../middlewares/errors')

function apiShares() {
    const api = express.Router();

    // GET api/shares/  (admin only risky operation)
    api.get('/', jwtAuth.auth ,catchAsync(sharesController.findAll))

    // GET api/shares/name/:name
    api.get('/name/:name', catchAsync(sharesController.findOneCompany))

    // GET api/shares/effectiveDate/:effectiveDate{YYYY-MM-DD}
    api.get('/effectiveDate/:effectiveDate', catchAsync(sharesController.findAllByDay))

    // GET api/shares/:effectiveDate{YYYY-MM-DD}/:name
    api.get('/:effectiveDate/:name', catchAsync(sharesController.findOneByDay))


    // GET api/shares/update-time
    api.get('/update-time', catchAsync(sharesController.getUpdateDate))

    // GET api/shares/update-shares?path-to-local-file={PATH} {path to file downloaded from https://www.gpw.pl/archiwum-notowan on your local computer}
    // PATH - needed to be specified as absolute path
    // As variable in reqest named as : filePath

    api.get('/update-shares', jwtAuth.auth ,catchAsync(sharesController.update))

    return api;
}

module.exports = {apiShares};