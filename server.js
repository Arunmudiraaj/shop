/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');

const app = express();

app.options('*', cors());

const dotenv = require('dotenv');
dotenv.config();

const morgan = require('morgan');

const path = require('path');
const bodyParser = require('body-parser');
const { shopDB } = require('./config/config');
shopDB;

// Import routes
const authRoute = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT;

app.use('/api/auth', authRoute);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);

shopDB.sync({ force: false })
  .then(() => console.log('Database synchronized'))
  .catch(err => console.error('Error synchronizing database:', err));

module.exports = app.listen(port, () =>
  console.log(`Server up and running on ${port}`)
);
