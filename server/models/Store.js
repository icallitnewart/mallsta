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
  order : {
    type: Array,
    default : []
  },
  product : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  productTotal : {
    type: Number,
    default: 0
  }
}, { timestamps : true });

const Store = mongoose.model('Store', storeSchema);

module.exports = { Store };