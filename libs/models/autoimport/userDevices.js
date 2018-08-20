module.exports = function(sequelize, DataTypes) {
    const UserDevices = sequelize.define('userDevice', {
        // Fingerprint
        //* Generate UUID by string
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        anonymous: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        lastActivity: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        clientId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: true,
            defaultValue: null
        }
    }, {paranoid: true});

    return UserDevices;
};