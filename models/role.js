const { DataTypes } = require("sequelize");
const { shopDB } = require("../config/config");

const Role = shopDB.define(
  "tbl_role",
  {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Role;
