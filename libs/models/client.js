const Sequelize = require('sequelize');
const db = require('../db/pg');

/**
 * Contains information about application that tries to connect to server
 * 
 * All application have their own keys and secrets
 * 
 * Anonymous applications should use bearer authorization
 */
const Client = db.define('client', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    clientId: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    clientSecret: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
});

module.exports = Client;