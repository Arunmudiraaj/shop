const { DataTypes } = require("sequelize");
const { shopDB } = require("../config/config");
const User = require("./user");

const Cart = shopDB.define('tbl_cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, { timestamps: true });

// Associations
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

module.exports = Cart;
