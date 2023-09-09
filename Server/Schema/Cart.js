const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  idUser: {
    type: String,
    required: true,
  },
    idItem: {
      type: String,
      required: true,
    },
    qty: {
      type: String,
      required: true,
    },
    // Add more fields as needed, such as shippingAddress, orders, etc.
  });
  
const Cart = mongoose.model('Cart', cartSchema);
  
module.exports = Cart;
  