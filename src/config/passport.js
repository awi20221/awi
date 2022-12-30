const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../models/user').userModel;

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


function verifyCallback(payload, done) {
    return User.findOne({_id: payload.id})
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            return done(err);
        });
}

function configJWT() {
    const config = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    };

    passport.use(User.createStrategy());
    passport.use(new JWTStrategy(config, verifyCallback));
}

module.exports = {configJWT};