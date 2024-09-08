/* eslint-disable no-undef */
const Sequelize = require("sequelize");

const shopDB = new Sequelize(
  process.env.SHOP_DB,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  { host: process.env.DB_HOST, dialect: "mysql", logging: false }
);

const shopDBFn = async () => {
  try {
    await shopDB.authenticate();
    console.log(
      "shop DB Sequelize connection has been established successfully"
    );
  } catch (err) {
    console.error("Unable to connect to database", err);
  }
};

shopDBFn();

module.exports = {
  shopDB,
};
