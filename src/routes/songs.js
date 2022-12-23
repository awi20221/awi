const Router =require('express');
const { catchAsync } = require("../middlewares/errors");
const songsController= require('../controllers/songsController');


    function apiSongs() {
        const api = Router();

        // GET /songs/:slug
        api.get('/:slug', catchAsync(songsController.findOne));

        // GET /songs
        api.get('/', catchAsync(songsController.findAll));

        // POST /songs
        api.post('/', catchAsync(songsController.create));

        // PUT /songs/:slug
        api.put('/:slug', catchAsync(songsController.update));

        // DELETE /songs/:slug
        api.delete('/:slug', catchAsync(songsController.remove));

        return api;
    }

    module.exports = {apiSongs};
