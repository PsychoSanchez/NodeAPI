const Sequelize = require('sequelize');
const db = require('../db/pg');
// const Scenario = require('./scenario');
// const User = require('./user');

const UserScenario = db.define('userScenario', {
    allowAnonymous: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    played: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    stopped: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    completed: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    userId: {
        type: Sequelize.UUID,
        allowNull: true
    },
    clientId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    scenarioId: {
        type: Sequelize.UUID,
        allowNull: false
    }
});

// User.belongsToMany(Scenario, {through: UserScenario});
// Scenario.belongsToMany(User, {through: UserScenario});

module.exports = UserScenario;