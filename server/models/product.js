const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  stockCount: {
    type: Number,
    required: true,
  },
}, { _id: true }); // This ensures that MongoDB will automatically generate an _id for each variant

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productImage: [
    {
      type: String,
      required: true,
    },
  ],
  variations: [variantSchema],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

 