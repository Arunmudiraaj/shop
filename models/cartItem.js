const { DataTypes } = require("sequelize");
const { shopDB } = require("../config/config");
const Product = require("./product");
const Cart = require("./cart");

const CartItem = shopDB.define('tbl_cart_item', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, { timestamps: true });

// Associations
Cart.belongsToMany(Product, { through: CartItem, foreignKey: 'cartId', otherKey: 'productId' });
Product.belongsToMany(Cart, { through: CartItem, foreignKey: 'productId', otherKey: 'cartId' });

module.exports = CartItem;
