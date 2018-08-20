var libs = process.cwd() + '/libs/';
var config = require(libs + 'config');

var test = require('tape');
var request = require('superagent');
var baseUrl = 'http://localhost:1337/api';

var userCredentials = {
    username: config.get('default:user:username'),
    password: config.get('default:user:password')
};
var clientCredentials = {
    client_id: config.get('default:client:clientId'),
    client_secret: config.get('default:client:clientSecret')
};
var accessToken;
var refreshToken;

function getTokensFromBody(body) {
    if (!('access_token' in body) || !('refresh_token' in body)) {
        return false;
    }

    accessToken = body['access_token'];
    refreshToken = body['refresh_token'];

    return true;
}

test('Unauthorized request', function (t) {
    request
        .get(baseUrl + '/')
        .end(function (err, res) {
            t.equal(res.status, 401, 'response status shoud be 401');
            t.end();
        });
});

test('Get token from username-password', function (t) {
    request
        .post(baseUrl + '/oauth/token')
        .send({ grant_type: 'password' })
        .send(userCredentials)
        .send(clientCredentials)
        .end(function (err, res) {
            t.equal(res.status, 200, 'response status shoud be 200');
            t.true(getTokensFromBody(res.body), 'tokens shoud be in response body');
            t.end();
        });
});

test('Get token from refresh token', function (t) {
    request
        .post(baseUrl + '/oauth/token')
        .send({ grant_type: 'refresh_token', refresh_token: refreshToken })
        .send(clientCredentials)
        .end(function (err, res) {
            t.equal(res.status, 200, 'response status shoud be 200');
            t.true(getTokensFromBody(res.body), 'tokens shoud be in response body');
            t.end();
        });
});

test('Authorized request', function (t) {
    request
        .get(baseUrl + '/')
        .set('Authorization', 'Bearer ' + accessToken)
        .end(function (err, res) {
            t.equal(res.status, 200, 'response status shoud be 200');
            t.end();
        });
});

test('Test users/info', function (t) {
    request
        .get(baseUrl + '/users/info')
        .set('Authorization', 'Bearer ' + accessToken)
        .end(function (err, res) {
            t.equal(res.status, 200, 'response status shoud be 200');
            t.equal(res.body['name'], userCredentials['username'], 'username shoud be correct');
            t.end();
        });
});
