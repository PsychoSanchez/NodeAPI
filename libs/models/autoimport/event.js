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

module.exports = function(sequelize, DataTypes) {
    const Event = sequelize.define('event', {
        type: {
            type: DataTypes.ENUM,
            values: [EVENT_TYPES.TEST, EVENT_TYPES.PLAYED],
            defaultValue: EVENT_TYPES.PLAYED
        },
        started: {
            type: DataTypes.DATE
        },
        finished: {
            type: DataTypes.DATE
        },
        result: {
            type: DataTypes.ENUM,
            values: [EVENT_RESULTS.INTERRUPT, EVENT_RESULTS.STOP, EVENT_RESULTS.COMPLETE, EVENT_RESULTS.ERROR, EVENT_RESULTS.UNKNOWN],
            defaultValue: EVENT_RESULTS.UNKNOWN
        },
        app: {
            type: DataTypes.ENUM,
            values: [EVENT_APP.EXTENSION, EVENT_APP.WIDGET, EVENT_APP.ONDEMAND, EVENT_APP.UNKNOWN],
            defaultValue: EVENT_APP.UNKNOWN
        },
        // Associatoins wont be wery usefull here
        scenarioId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        fingerprintId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Event;
};