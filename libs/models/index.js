'use strict';

module.exports = {
  models: {
    AccessToken: require('./accessToken'),
    Client: require('./client'),
    Event: require('./event'),
    Organisation: require('./organisation'),
    RefreshToken: require('./refreshToken'),
    Scenario: require('./scenario'),
    Step: require('./step'),
    User: require('./user'),
    UserDevices: require('./userDevices'),
    UserScenarios: require('./userScenarios'),
  },
  sequelize: require('../db/pg'),
  Sequelize: require('sequelize')
};
