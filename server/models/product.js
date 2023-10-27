const mongoose = require('mongoose');

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
  imageUrls: [
    {
      type: String,
      required: true,
    },
  ],
  variations: [
    {
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
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

