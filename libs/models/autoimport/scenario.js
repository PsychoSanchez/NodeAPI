module.exports = function(sequelize, DataTypes) {
  const Scenario = sequelize.define('scenario', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    steps: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {paranoid: true});

  return Scenario;
};