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
  },
  url : {
    type: String,
    required: true
  },
  likes : {
    total : {
      type: Number,
      default: 0
    },
    users : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  order : {
    total : {
      type: Number,
      default: 0
    },
    orderList : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
      }
    ],
    buyers : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  }
}, { timestamps : true });

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };