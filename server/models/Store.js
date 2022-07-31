const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  desc : {
    type: String,
    required: true
  },
  rank : {
    type: Number,
    default : 1
  },
  category : {
    type: Array,
    required: true
  },
  owner : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order : [
    {
      orderNumber : {
        type : Number
      },
      productList : [
        {
          product : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
          },
          quantity : {
            type : Number,
            min : 1
          }
        }
      ],
      buyer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      date : {
        type : Date
      }
    }
  ],
  product : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  productCounter : {
    type: Number,
    default: 0
  },
  productTotal : {
    type: Number,
    default: 0
  }
}, { timestamps : true });

const Store = mongoose.model('Store', storeSchema);

module.exports = { Store };