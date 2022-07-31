const mongoose = require('mongoose');

//per store
const orderSchema = mongoose.Schema({
  orderNumber : {
    type: Number,
    required: true
  },
  productList : [
    {
      product : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity : {
        type: Number,
        min: 1,
        required: true
      }
    }
  ],
  store : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  buyer : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date : {
    type: Date,
    required: true
  }
}, { timestamps : true });

const Order = mongoose.model('Order', orderSchema);

module.exports = { Order };