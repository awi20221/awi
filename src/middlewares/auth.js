const passport = require('passport');


//TODO: dodać catch async
function auth(req, res, next) {
    return passport.authenticate('jwt', { session: false })(req, res, next);
}

module.exports = {auth};

