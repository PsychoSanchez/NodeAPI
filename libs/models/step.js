const Sequelize = require('sequelize');
const db = require('../db/pg');

const Step = db.define('steps', {
    data: {
        type: Sequelize.JSON
    }
}, {paranoid: true});

module.exports = Step;