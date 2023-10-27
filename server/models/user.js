const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const Order = require('./Order');

const userSchema = new Schema({
  // userName: {
  //   type: String,
  //   required: false, // Not required for guest users
  //   trim: true,
  // },
  firstName: {
    type: String,
    required: false, // Not required for guest users
    trim: true,
  },
  lastName: {
    type: String,
    required: false, // Not required for guest users
    trim: true,
  },
  email: {
    type: String,
    required: true, // Always required
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: false, // Not required for guest users
    minlength: 5,
  },
  phoneNumber: {
    type: String,
    required: false, // Optional
    trim: true,
  },
  // Reference to Order by ID instead of embedding
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order',
  }],
});

// Set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    try {
      const saltRounds = 12;
      this.password = await bcrypt.hash(this.password, saltRounds);
      return next();
    } catch (err) {
      return next(err);
    }
  } else {
    return next();
  }
});

// Compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error('Could not compare passwords');
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;

