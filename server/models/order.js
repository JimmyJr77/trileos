const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    min: [1, 'Quantity can not be less than 1.'],
    default: 1
  },
  priceAtPurchase: {
    type: Number,
    required: true,
    min: [0, 'Price can not be negative.']
  }
}, {
  _id: false,
  timestamps: false
});

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  products: [orderItemSchema],
  totalPrice: {
    type: Number,
    required: true,
    min: [0, 'Total price can not be negative.']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
