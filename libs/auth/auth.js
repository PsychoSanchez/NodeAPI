var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

var libs = process.cwd() + '/libs/';

var config = require(libs + 'config');
var model = require('../models').models;
var User = model.User;
var Client = model.Client;
var AccessToken = model.AccessToken;
var RefreshToken = model.RefreshToken;

// 2 Client Password strategies - 1st is required, 2nd is optional
// https://tools.ietf.org/html/draft-ietf-oauth-v2-27#section-2.3.1

// Client Password - HTTP Basic authentication
passport.use(new BasicStrategy(
    function(clientId, clientSecret, done) {
        Client.findOne({where: {clientId: clientId}}).then(function(user) {
            if (!user) {
                return done(null, false);
            }

            if (user.clientSecret !== clientSecret) {
                return done(null, false);
            }

            return done(null, user);
        }).catch(function(err) {
            if (err) {
                return done(err);
            }
        });
    }
));

// Client Password - credentials in the request body
passport.use(new ClientPasswordStrategy(
    function(clientId, clientSecret, done) {
        Client.findOne({where: {clientId: clientId}}).then(function(user) {
            if (!user) {
                return done(null, false);
            }

            if (user.clientSecret !== clientSecret) {
                return done(null, false);
            }

            return done(null, user);
        }).catch(function(err) {
            if (err) {
                return done(err);
            }
        });
    }
));

// Bearer Token strategy
// https://tools.ietf.org/html/rfc6750

passport.use(new BearerStrategy(
    function(accessToken, done) {
        AccessToken.findOne({where: {token: accessToken}}).then(function(token) {
            if (!token) {
                return done(null, false);
            }

            if (Math.round((Date.now() - token.created) / 1000) > config.get('security:tokenLife')) {

                AccessToken.destroy({where: {token: accessToken}}).catch(function(err) {
                    if (err) {
                        return done(err);
                    }
                });

                return done(null, false, {message: 'Token expired', scope: null});
            }

            return User.findById(token.userId).then(function(user) {
                if (!user) {
                    return done(null, false, {message: 'Unknown user', scope: null});
                }

                done(null, user, {scope: '*', message: null});
            });
        }).catch(function(err) {
            if (err) {
                return done(err);
            }
        });
    }
));
