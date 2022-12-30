const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const URLSlugs = require('mongoose-url-slugs')


const userSchema = mongoose.Schema({
    login: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true

    },
    role: {
        type: String,
        trim: true,
        default: 'USER'
    }
},
    {
        timestamps: true // created_at / updated_at
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'login' });
userSchema.plugin(URLSlugs('login',{field: 'slug', update: true}))


const userModel = mongoose.model('users', userSchema);

module.exports = {userModel};