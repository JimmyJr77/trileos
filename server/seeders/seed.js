const mongoose = require('mongoose');
const db = require('../config/connection');  // Ensure this file correctly sets up your MongoDB connection
const { Product } = require('../models');    // Ensure this file defines the Product model
const products = require('./products.js');   // Your products data

db.once('open', async () => {
  try {
    await Product.deleteMany({});
    await Product.create(products);
    console.log('Products seeded!');
    process.exit(0);
  } catch (err) {
    throw new Error(err);
  }
});
