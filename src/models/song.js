const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const Song = mongoose.Schema({
    title: String
}, {
   timestamps: true
});

Song.plugin(URLSlugs('title', { field: 'slug', update: true }));

const songModel = mongoose.model('Song', Song);

module.exports = {songModel};