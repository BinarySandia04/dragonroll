const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User');
const key = require('./keys').secret;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload._id).then((user) => {
                if(user) return done(null, user);
                return done(null, false);
            }).catch(err => {
                console.log(err);
            });
        })
    )
}