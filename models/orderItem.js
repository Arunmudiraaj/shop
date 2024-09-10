const { DataTypes } = require("sequelize");
const { shopDB } = require("../config/config");
const Order = require("./order");
const Product = require("./product");

const OrderItem = shopDB.define('tbl_order_item', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, { timestamps: true });

// Associations
Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId', otherKey: 'productId' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId', otherKey: 'orderId' });

module.exports = OrderItem; 
