const Sequelize = require('sequelize');
const db = require('../db/pg');

const RefreshToken = db.define('refreshToken', {
    userId: {
        type: Sequelize.UUID,
        allowNull: false
    },

    clientId: {
        type: Sequelize.STRING,
        allowNull: false
    },

    token: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
});

module.exports = RefreshToken;