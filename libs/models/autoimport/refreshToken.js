module.exports = function(sequelize, DataTypes) {
    const RefreshToken = sequelize.define('refreshToken', {
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

    return RefreshToken;
};