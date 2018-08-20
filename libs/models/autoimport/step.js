module.exports = function(sequelize, DataTypes) {
    const Step = sequelize.define('steps', {
        data: {
            type: DataTypes.JSON
        }
    }, {paranoid: true});

    return Step;
};
