module.exports = function(sequelize, DataTypes) {
    const AccessToken = sequelize.define('accessToken', {
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        clientId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        token: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    });

    return AccessToken;
};