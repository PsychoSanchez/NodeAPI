# Node REST API

[![CI Status](http://img.shields.io/travis/ealeksandrov/NodeAPI.svg)](https://travis-ci.org/ealeksandrov/NodeAPI)
[![Dependency Status](https://img.shields.io/david/ealeksandrov/NodeAPI.svg)](https://david-dm.org/ealeksandrov/NodeAPI)
[![Dependency Status](https://img.shields.io/david/dev/ealeksandrov/NodeAPI.svg)](https://david-dm.org/ealeksandrov/NodeAPI)
[![License](https://img.shields.io/github/license/ealeksandrov/NodeAPI.svg)](LICENSE.md)

`NodeAPI` is REST API server implementation built on top `Node.js` and `Express.js` with `Sequalize.js` for `Postrgesql` integration. Access control follows `OAuth 2.0` spec with the help of `OAuth2orize` and `Passport.js`.

This is updated code that follows [RESTful API With Node.js + MongoDB](https://aleksandrov.ws/2013/09/12/restful-api-with-nodejs-plus-mongodb) article.

## Running project

## Manual

You need to have [Node.js](https://nodejs.org) installed.

### Run server

```sh
npm start
# alias for
node bin/www
```

## Docker

You need to have [Docker](https://www.docker.com/community-edition) installed.

### Run server

```sh
docker-compose up -d --build
```

## Make Requests

Create and refresh access tokens:

```sh
http POST http://localhost:1337/api/oauth/token grant_type=password client_id=chrome-ext client_secret=aJhjsdjl13gh7 username=admin password=1admin!
http POST http://localhost:1337/api/oauth/token grant_type=refresh_token client_id=chrome-ext client_secret=aJhjsdjl13gh7 refresh_token=[REFRESH_TOKEN]
```
Get your data:

```sh
http http://localhost:1337/api/users/info Authorization:'Bearer ACCESS_TOKEN'
```

## Tests

```sh
npm test
# alias for
node ./test/server.test.js
```

## Modules used

Some of non-standard modules used:

* [express](https://www.npmjs.com/package/express)
* [sequelize](https://www.npmjs.com/package/sequelize)
* [nconf](https://www.npmjs.com/package/nconf)
* [winston](https://www.npmjs.com/package/winston)
* [faker](https://www.npmjs.com/package/faker)
* [oauth2orize](https://www.npmjs.com/package/oauth2orize)
* [passport](https://www.npmjs.com/package/passport)

Test modules:

* [tape](https://www.npmjs.com/package/tape)
* [superagent](https://www.npmjs.com/package/superagent)

## Tools used

* [httpie](https://github.com/jkbr/httpie) - command line HTTP client

## Author

Created and maintained by Evgeny Aleksandrov ([@ealeksandrov](https://twitter.com/ealeksandrov)).

Updated by:

* [Istock Jared](https://github.com/IstockJared)
* [Marko Arsić](https://marsic.info/)
* and other [contributors](https://github.com/ealeksandrov/NodeAPI/graphs/contributors)

## License

`NodeAPI` is available under the MIT license. See the [LICENSE.md](LICENSE.md) file for more info.
