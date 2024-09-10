const { DataTypes } = require("sequelize");
const { shopDB } = require("../config/config");
const Product = require("./product");
const User = require("./user");

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
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id'
        }
    }
}, { timestamps: true });

// Associations
User.belongsToMany(Product, { through: CartItem, foreignKey: 'userId', otherKey: 'productId' });
Product.belongsToMany(User, { through: CartItem, foreignKey: 'productId', otherKey: 'userId' });

module.exports = CartItem;
