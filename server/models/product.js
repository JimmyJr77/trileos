const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  size: {
    type: [String],
    required: true,
    validate: [arrayLimit, '{PATH} exceeds the limit of 10']
  },
  color: {
    type: [String],
    required: true,
    validate: [arrayLimit, '{PATH} exceeds the limit of 10']
  },
  quantity: {
    type: Number,
    required: false,
    min: [0, 'Quantity cannot be negative']
  },
  imageUrl: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 10']
  },
  stockCount: {
    type: Number,
    required: true,
    min: [0, 'Stock count cannot be negative']
  }
});

function arrayLimit(val) {
  return val.length <= 10;
}

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
