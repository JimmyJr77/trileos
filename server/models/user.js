const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const Order = require('./order');

const userSchema = new Schema({
  // Uncomment the userName field if you want to use it
  userName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!']
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  // Reference to Order by ID instead of embedding
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }]
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
