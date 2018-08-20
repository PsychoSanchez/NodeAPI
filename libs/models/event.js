const Sequelize = require('sequelize');
const db = require('../db/pg');

const EVENT_TYPES = {
    TEST: 'TEST',
    PLAYED: 'PLAYED'
};

const EVENT_RESULTS = {
    INTERRUPT: 'INTERRUPT',
    STOP: 'STOP',
    COMPLETE: 'COMPLETE',
    ERROR: 'ERROR',
    UNKNOWN: 'UNKNOWN'
};

const EVENT_APP = {
    EXTENSION: 'EXTENSION',
    WIDGET: 'WIDGET',
    ONDEMAND: 'ONDEMAND',
    UNKNOWN: 'UNKNOWN'
};

const Event = db.define('event', {
    type: {
        type: Sequelize.ENUM,
        values: [EVENT_TYPES.TEST, EVENT_TYPES.PLAYED],
        defaultValue: EVENT_TYPES.PLAYED
    },
    started: {
        type: Sequelize.DATE
    },
    finished: {
        type: Sequelize.DATE
    },
    result: {
        type: Sequelize.ENUM,
        values: [EVENT_RESULTS.INTERRUPT, EVENT_RESULTS.STOP, EVENT_RESULTS.COMPLETE, EVENT_RESULTS.ERROR, EVENT_RESULTS.UNKNOWN],
        defaultValue: EVENT_RESULTS.UNKNOWN
    },
    app: {
        type: Sequelize.ENUM,
        values: [EVENT_APP.EXTENSION, EVENT_APP.WIDGET, EVENT_APP.ONDEMAND, EVENT_APP.UNKNOWN],
        defaultValue: EVENT_APP.UNKNOWN
    },
    // Associatoins wont be wery usefull here
    scenarioId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    fingerprintId: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Event;