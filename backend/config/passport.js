const passport = require('passport');
const passportJWT = require('passport-jwt');    //strategia autoryzacji przy użyciu jwt z biblioteki passport
const User = require('../models/user').userModel;

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;  //funkcja ekstraktująca token z requestu


function verifyCallback(payload, done) {
    return User.findOne({_id: payload.id})
        .then(user => {
            return done(null,user)
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

    passport.use(User.createStrategy());                        //strategia stowrzona za pomoca biblioteki passport-local-mongoose z modelu User
    passport.use(new JWTStrategy(config, verifyCallback));
}

module.exports = {configJWT};