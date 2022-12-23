const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    }
}, {
    timestamps: true // created_at / updated_at
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const userModel = mongoose.model('User', UserSchema);

module.exports = {userModel};