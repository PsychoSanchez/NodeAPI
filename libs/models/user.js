const Sequelize = require('sequelize');
const db = require('../db/pg');
const crypto = require('crypto');


/**
 * Encrypt pass word
 * 
 * @param {string} password Password 
 * @param {string} salt HEX salt 
 * @returns {string} Encrypted password
 */
function encryptPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 128, 'sha512').toString('hex');
};


const User = db.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[a-z0-9\_\-]+$/i,
    }
  },
  password: {
    type: Sequelize.STRING(256),
    allowNull: false,
    set(val) {
      this.setDataValue('salt', crypto.randomBytes(128).toString('hex'));
      this.setDataValue('password', encryptPassword(val, this.getDataValue('salt')));
    }
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      isEmail: true
    }
  },
  verified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  blocked: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  salt: {
    type: Sequelize.STRING(256),
    allowNull: false,
    defaultValue: crypto.randomBytes(128).toString('hex')
  },
  role: {
    type: Sequelize.ENUM,
    values: ['SUPERADMIN', 'ADMIN', 'CLIENT', 'MANAGER', 'USER'],
    defaultValue: 'USER'
  }
});

/**
 * Password comparer 
 * 
 * @param {string} pass password to compare 
 */
User.prototype.isPassEqual = function(pass) {
  return this.password === encryptPassword(pass, this.salt);
};

module.exports = User;