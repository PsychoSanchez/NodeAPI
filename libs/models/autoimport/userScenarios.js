module.exports = function(sequelize, DataTypes) {
    const UserScenario = sequelize.define('userScenario', {
        allowAnonymous: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        played: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        stopped: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        completed: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: true
        },
        clientId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        scenarioId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    });

    return UserScenario;
};