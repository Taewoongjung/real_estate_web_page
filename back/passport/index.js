const passport = require('passport');
const local = require('./local');

module.exports = () => {
    passport.serializeUser((users, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id } })
            .then(user => done(null, user))
            .catch(err => done(err));
    });
    local();
};