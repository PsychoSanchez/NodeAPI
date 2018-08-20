var oauth2orize = require('oauth2orize');
var passport = require('passport');
var crypto = require('crypto');

var libs = process.cwd() + '/libs/';

var config = require(libs + 'config');
var log = require(libs + 'log')(module);

var model = require('../models').models;
var User = model.User;
var Client = model.Client;
var AccessToken = model.AccessToken;
var RefreshToken = model.RefreshToken;

// Create OAuth 2.0 server
var aserver = oauth2orize.createServer();

// Generic error handler
var errFn = function(cb, err) {
    if (err) {
        return cb(err);
    }
};

// Destroy any old tokens and generates a new access and refresh token
function generateTokens(data, done) {

    // Curries in `done` callback so we don't need to pass it
    var errorHandler = errFn.bind(undefined, done),
        refreshTokenValue,
        tokenValue;

    RefreshToken.destroy({where: data}).catch(errorHandler);
    AccessToken.destroy({where: data}).catch(errorHandler);

    tokenValue = crypto.randomBytes(32).toString('hex');
    refreshTokenValue = crypto.randomBytes(32).toString('hex');

    var tokens = [
        AccessToken.create(Object.assign({}, data, {token: tokenValue})),
        RefreshToken.create(Object.assign({}, data, {token: refreshTokenValue}))
    ];
    Promise.all(tokens).then(function() {
        done(null, tokenValue, refreshTokenValue, {
            'expires_in': config.get('security:tokenLife')
        });
    }).catch(function(err) {
        if (err) {
            log.error(err);
            return done(err);
        }
    });
};

aserver.serializeClient(
    (client, done) => {
        return done(null, client.id);
    }
);

aserver.deserializeClient((id, done) => {
    Client.findById(id).then((client) => {
        return done(null, client);
    }).catch((error) => {
        if (error) {
            return done(error);
        }
    });
});


// Exchange username & password for access token
aserver.exchange(oauth2orize.exchange.password(function(client, username, password, scope, done) {
    User.findOne({where: {username: username}}).then(function(user) {
        if (!user || !user.isPassEqual(password)) {
            return done(null, false);
        }

        var model = {
            userId: user.id,
            clientId: client.clientId
        };

        generateTokens(model, done);
    }).catch(function(err) {
        if (err) {
            return done(err);
        }
    });

}));

// Exchange refreshToken for access token
aserver.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {
    RefreshToken.findOne({
        where: {
            token: refreshToken,
            clientId: client.clientId
        }
    }).then(function(token) {
        if (!token) {
            return done(null, false);
        }

        return User.findById(token.userId).then(function(user) {
            if (!user) {
                return done(null, false);
            }

            var model = {
                userId: user.id,
                clientId: client.clientId
            };

            generateTokens(model, done);
        });
    }).catch(function(err) {
        if (err) {
            return done(err);
        }
    });
}));

// token endpoint
//
// `token` middleware handles client requests to exchange authorization grants
// for access tokens. Based on the grant type being exchanged, the above
// exchange middleware will be invoked to handle the request. Clients must
// authenticate when making requests to this endpoint.

exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], {session: false}),
    aserver.token(),
    aserver.errorHandler()
];
