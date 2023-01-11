const mongoose = require('mongoose');


const shareUpdateTimeSchema = mongoose.Schema({
    effectiveDate: {
        type: String,
        trim: true,
        required: true
    }
});


const shareUpdateTimeModel = mongoose.model('sharesUpdateTime', shareUpdateTimeSchema);

module.exports = {shareUpdateTimeModel};