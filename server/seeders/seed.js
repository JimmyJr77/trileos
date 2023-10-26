const db = require('../config/connection');
const { Product } = require('../models');
// const productSeeds = require('./products.json');
const products  = require('./products.js');


db.once('open', async () => {
  try {
    await Product.deleteMany({});
    await Product.create(products);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});