const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  phone :{
    type: String,
    required: true,
  },
  // Add more fields as needed, such as shippingAddress, orders, etc.
});

const User = mongoose.model('User', userSchema);

module.exports = User;
