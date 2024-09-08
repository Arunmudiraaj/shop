const { shopDB } = require('../config/config');
const { DataTypes } = require("sequelize");
const Role = require('./role');
const constants = require('../constants/constants');

const User = shopDB.define('tbl_user', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
    validate: {
      len: [6, 255]
    }
  },
  email: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
    unique: true,
    validate: {
      len: [6, 255],
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
    select: false, // preventing password not to be returned in queries by default
    validate: {
      len: [6, 1024]
    }
  },
  roleId: {
    type: DataTypes.INTEGER,
    defaultValue: constants.ROLE_ID.USER,
    allowNull: false
  },
});

Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

module.exports = User;
