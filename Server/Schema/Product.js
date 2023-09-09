const mongoose = require('mongoose');

// Define the Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  status: String,
  salePrice: String,
  sale: Boolean,
  category: {
    type: String,
    required: true,
    default: 'man'
  },
  rating: {
    type: Number,
    required: true,
    default: 1
  }
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;