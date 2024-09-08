const { DataTypes } = require("sequelize");
const { shopDB } = require("../config/config");
const Product = require("./product");

const Category = shopDB.define('tbl_category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true });

// Associations
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Category;
