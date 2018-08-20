module.exports = function(sequelize, DataTypes) {
  const Organisation = sequelize.define('organisation', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    site: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    activity: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    userslimit: {
      type: DataTypes.INTEGER,
      defaultValue: 100
    }
  });
  return Organisation;
};