const Sequelize = require('sequelize');
const db = require('../db/pg');

const UserDevices = db.define('userDevice', {
    // Fingerprint
    //* Generate UUID by string
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    anonymous: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    lastActivity: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    clientId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    userId: {
        type: Sequelize.UUID,
        allowNull: true,
        defaultValue: null
    }
}, {paranoid: true});

module.exports = UserDevices;