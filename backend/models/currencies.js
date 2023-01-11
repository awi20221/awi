const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs')


const currencySchema = mongoose.Schema({
        currency: {
            type: String,
            trim: true,
            required: true
        },
        code: {
            type: String,
            trim: true,
            required: true
        },
        mid: {
            type: Number,
            trim: true,
        },
        effectiveDate: {
            type: String,
            required: true,
            trim: true
        }
    });

currencySchema.plugin(URLSlugs('code',{field: 'slug', update: true}))



const currencyModel = mongoose.model('currencies', currencySchema);

module.exports = {currencyModel};