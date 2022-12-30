const mongoose = require('mongoose');


const currencyUpdateTimeSchema = mongoose.Schema({
    effectiveDate: {
        type: String,
        trim: true,
        required: true
    }
});


const currencyUpdateTimeModel = mongoose.model('currenciesUpdateTime', currencyUpdateTimeSchema);

module.exports = {currencyUpdateTimeModel};