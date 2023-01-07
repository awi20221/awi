const passport = require('passport');

/**
 *Konieczne zdefiniowanie strategi jwt aby funkcja działała poprwanie (patrz plik passport.js)
 * Funkcja stanowi middleware dla uwierzytelniania zalogowanych użytkowników za pomocą tokenów,
 * Użytkownik najpierw loguje się używając strategi 'local' potem może uzyskiwać dane do czasu wyaśnięcia tokenu,
 * dzięki strategi 'jwt', aby to zrobić konieczne jest wysłanie tokenu w reqest w polu headers: Authenicate: Bearer AccessToken
 */
function auth(req, res, next) {
    return passport.authenticate('jwt', { session: false })(req, res, next);
}

module.exports = {auth};

