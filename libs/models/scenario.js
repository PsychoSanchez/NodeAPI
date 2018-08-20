const Sequelize = require('sequelize');
const Organisation = require('./organisation');
const db = require('../db/pg');
const Step = require('./step');

const Scenario = db.define('scenario', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
    defaultValue: null
  },
  origin: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  published: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  steps: {
    type: Sequelize.JSON,
    allowNull: false
  }
}, {paranoid: true});

Scenario.Organisation = Scenario.belongsTo(Organisation, {as: 'client'});
// Scenario.Steps = Scenario.hasMany(Step, {as: 'steps'});

module.exports = Scenario;