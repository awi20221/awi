const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const URLSlugs = require('mongoose-url-slugs')


const userSchema = mongoose.Schema({
    fullName: {
      type: String,
      trim: true,
      required: true
    },
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
    },
    active: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true // created_at / updated_at
});

/**
 * Plugin passport-local-mongoose umożliwia obsługę danych autoryzacyjnych, usernameField oznacza, czym będziemy logować
 * się do aplikcaji, natomiast hasło zostanie samo zaszyfrowane i zapisane w bazie w miejscu rejestracji użytkownika metodą
 * register() z biblioteki passport-local-mongoose w pliku authController, ponieżej znajduje się utworzona strategia lokalna
 */

userSchema.plugin(passportLocalMongoose, { usernameField: 'login' });

userSchema.plugin(URLSlugs('login',{field: 'slug', update: true}))


const userModel = mongoose.model('users', userSchema);

module.exports = {userModel};