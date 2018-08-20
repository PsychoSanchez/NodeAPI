/**
 * Contains information about application that tries to connect to server
 * 
 * All application have their own keys and secrets
 * 
 * Anonymous applications should use bearer authorization
 */

module.exports = function(sequelize, DataTypes) {
    const Client = sequelize.define('client', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        clientId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },

        clientSecret: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    });

    return Client;
};