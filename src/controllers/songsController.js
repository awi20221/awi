const Song = require('../models/song');


    async function findOne(req, res, next) {
        const song = await Song.findOne({ slug: req.params.slug });
        if (!song) return next();
        return res.status(200).send({ data: song });
    }

    async function findAll(req, res) {
        const songs = await Song.find();
        return res.status(200).send({ data: songs });
    }

    async function create(req, res) {
        const song = await new Song({
            title: req.body.title
        }).save();

        return res.status(201).send({ data: song, message: `Song was created` });
    }

    async function update(req, res, next) {
        const song = await Song.find({ 'slug': req.params.slug });
        if (!song) return next();

        song.title = req.body.title;
        await song.save();

        return res.status(200).send({ data: song, message: `Song was updated` });
    }

    async function remove(req, res, next) {
        const song = await Song.findOne({ 'slug': req.params.slug });
        if (!song) return next();
        await song.remove();

        return res.status(200).send({ message: `Song was removed` });
    }



//PAGINACJA DODAM POTEM
// async findAll(req, res) {
//     const songsPromise = Song.paginate({
//         limit: req.query.per_page || 2,
//         previous: req.query.previous || null,
//         next: req.query.next || null
//     });
//     const countPromise = Song.count();
//     const [songs, count] = await Promise.all([songsPromise, countPromise]);
//
//     const links = {};
//     if (songs.hasNext) {
//         links.next = `${req.protocol}://${req.get('host')}${req.path}?next=${songs.next}`;
//     }
//     if (songs.hasPrevious) {
//         links.previous = `${req.protocol}://${req.get('host')}${req.path}?previous=${songs.previous}`;
//     }
//     res.links(links);
//     res.set('total-count', count);
//
//     return res.status(200).send( songs.results );
// },

module.exports = {findAll, findOne, create, update, remove};