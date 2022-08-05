const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  review : {
    type: String,
    minlength: 10,
    maxlength: 50,
    required: true
  },
  rating : {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  writer : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  product : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  store : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true
  },
  order : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true
  }
}, { timestamps : true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = { Review };