const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  index : {
    type: Number,
    required: true
  },
  store : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true
  },
  title : {
    type: String,
    required: true
  },
  category : {
    department : {
      type: Number,
      required: true
    },
    productType : {
      type: String || Number,
      required: true
    }
  },
  price : {
    amount : {
      type: Number,
      required: true
    },
    currency : {
      type: String,
      required: true
    }
  },
  desc : {
    type: String,
    required: true
  },
  images : [
    {
      file : {
        fileName : {
          type : String,
          required: true
        },
        filePath : {
          type : String,
          required: true
        }
      },
      filter : {
        brightness : {
          type: Number,
          required: true
        },
        saturate : {
          type: Number,
          required: true
        },
        contrast : {
          type: Number,
          required: true
        }
      }
    }
  ],
  tags : {
    type: Array
  }
}, { timestamps : true });

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };