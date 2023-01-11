const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs')


const shareSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    // openingRate: {
    //     type: String,
    //     trim: true,
    //     required: true
    // },
    minimalRate: {
        type: String,
        trim: true,
        required: true
    },
    maximalRate: {
        type: String,
        trim: true,
        required: true
    },
    // closingRate: {
    //     type: String,
    //     trim: true,
    //     required: true
    // },
    change: {
        type: String,
        trim: true,
        required: true
    },
    effectiveDate: {
        type: String,
        trim: true,
        required: true
    }

});

shareSchema.plugin(URLSlugs('name',{field: 'slug', update: true}))



const shareModel = mongoose.model('shares', shareSchema);

module.exports = {shareModel};