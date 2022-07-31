const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Order } = require('../models/Order');
const { Store } = require('../models/Store');
const { Product } = require('../models/Product');
const { auth } = require('../middleware/auth');

//상품 주문
router.post('/place_order', auth, async (req, res)=> {
  //주문 날짜
  const date = new Date();
  //주문 번호 (base)
  let orderNumber = date.valueOf() * 100 + 1;
  //주문자 정보
  const buyer = req.user._id;
  //장바구니 목록
  const cartItems = req.body.cartItems;
  //상품 목록
  const products = cartItems.map(order=> order.product);
  //스토어 목록
  const stores = products.map(product=> product.store);
  //스토어별로 분류한 주문 목록 (cartItems)
  const orderPerStore = cartItems.reduce((acc, cur)=> {
    const storeId = cur.product.store._id;
    if(!acc[storeId]) acc[storeId] = [];
    acc[storeId].push(cur);
    return acc;
  }, {});
  //주문 목록
  let orders = [];
  for(let key in orderPerStore) {
    orders.push({ [key] : orderPerStore[key] });
  }

  try {
    //1. Order: 스토어별로 주문 접수
    const orderOpt = orders.map((order, idx)=> {
      orderNumber += idx;
      const productList = Object.values(order)[0];
      const store = Object.keys(order).toString();
      return { 
        orderNumber,
        productList,
        store,
        buyer,
        date
      }
    });
    const orderInfo = await Order.insertMany(orderOpt);

    //2. Store: 스토어에 주문 정보 업데이트
    const storeList = await Store.find({ _id : { $in : stores } });
    const storeOpt = storeList.map(store=> {
      //접수한 주문내역(Order) 스토어별로 분류
      const orderByStore = orderInfo.filter(result=> result.store._id.toString() === store._id.toString());
      return {
        updateOne : {
          filter : { _id : store._id },
          update : { $push : {
            order : orderByStore
          }}
        }
      }
    });
    await Store.bulkWrite(storeOpt);
    
    //3. User: 주문자에 주문 내역 업데이트
    await User.findOneAndUpdate(
      { _id : buyer },
      { $push : { 
          order : {
            orderList : orderInfo,
            payment : req.body.totalPrice,
            date : date
          }
      }},
      { new : true }
    );

    //4. Product : 주문한 상품에 주문 정보 업데이트
    const productList = await Product.find({ _id : { $in : products } });
    const productOpt = productList.map(product=> {
      //접수한 주문내역(Order) 상품별로 분류
      let orderByProduct = [];
      orderInfo.forEach(order=> {
        const targetProduct = order.productList.filter(item=> {
          return item.product._id.toString() === product._id.toString();
        });
        if(targetProduct.length > 0) orderByProduct.push(order);
      });
      //상품 수량
      let quantity = 0;
      cartItems.forEach(item=> {
        if(item.product._id === product._id.toString()) {
          quantity = item.quantity;
        } 
      });

      return {
        updateOne : {
          filter : { _id : product._id },
          update : { 
            $inc : { "order.total" : quantity },
            $push : {
              "order.orderList" : orderByProduct,
              "order.buyers" : buyer 
            }
          }
        }
      }
    });
    await Product.bulkWrite(productOpt);  

    //완료
    return res.status(200).json({ 
      success : true,
      order : orderInfo
    });
  } catch(err) {
    return res.json({ success : false, err : err.message });
  }
});

module.exports = router;