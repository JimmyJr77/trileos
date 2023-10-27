const db = require('../config/connection');
const { Product } = require('../models');
const productsData = require('./products.json');

db.once('open', async () => {
  try {
    await Product.deleteMany({});  // Clear existing products
    await Product.insertMany(productsData); // Bulk insert products
    console.log('Products seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products', error);
    process.exit(1);
  }
});
