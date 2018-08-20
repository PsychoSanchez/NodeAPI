module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z0-9\_\-]+$/i,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        isEmail: true
      }
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    roles: {
      type: DataTypes.ENUM,
      values: ['ADMIN', 'CLIENT', 'MANAGER', 'USER'],
      defaultValue: 'USER'
    }
  });

  return User;
};