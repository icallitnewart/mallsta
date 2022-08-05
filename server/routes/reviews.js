const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Order } = require('../models/Order');
const { Store } = require('../models/Store');
const { Product } = require('../models/Product');
const { Review } = require('../models/Review');
const { auth } = require('../middleware/auth');

//리뷰 작성
router.post('/write', auth, async (req, res)=> {
  const product = req.body.product;
  const order = req.body.order;

  try {
    //1. Review: 리뷰 등록
    const review = new Review({
      review : req.body.review,
      rating : req.body.rating,
      writer : req.user._id,
      product,
      store : req.body.store,
      order
    });
    const reviewInfo = await review.save();
      
    //2. Product: 해당 상품에 리뷰 업데이트
    await Product
    .findOneAndUpdate(
      { _id : product },
      { $push : { reviews : reviewInfo }},
      { new : true }
    );

    //3. Order : 주문 내역에 리뷰 업데이트
    await Order
    .findOneAndUpdate(
      { 
        _id : order,
        'productList.product' : product
      },
      { $set : { 'productList.$.review' : review } },
      { new : true }
    );
  
    //완료
    return res.status(200).json({
      success : true,
      review : reviewInfo
    });
  } catch(err) {
    return res.json({ success : false, err : err.message });
  }
});

//리뷰 목록 요청
router.get('/reviewList', (req, res)=> {
  const product = req.query.productId;

  Review
  .find({ product })
  .populate("writer")
  .exec((err, reviewInfo)=> {
    if(err) return res.json({ success : false, err });

    return res.status(200).json({
      success : true,
      reviewList : reviewInfo
    })
  });
});

module.exports = router;