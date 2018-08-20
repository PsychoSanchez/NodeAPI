const Sequelize = require('sequelize');
const db = require('../db/pg');

const Organisation = db.define('organisation', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  site: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  activity: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  userslimit: {
    type: Sequelize.INTEGER,
    defaultValue: 100
  }
});

module.exports = Organisation;