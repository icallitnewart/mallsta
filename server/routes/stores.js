const express = require('express');
const router = express.Router();
const { Store } = require('../models/Store');
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

//스토어 오픈
router.post("/register", (req, res)=> {
  Store.findOne({ owner : req.body.owner }, (err, storeInfo)=> {
    if(err) return res.json({ success : false, err });
    //스토어 중복 체크
    if(storeInfo) return res.json({
      success : false,
      err : "Store already open."
    });
    
    //스토어 등록
    const store = new Store(req.body);
    store.save((err, storeInfo)=> {
      if(err) return res.json({ success : false, err });

      //User DB 업데이트
      User.findOneAndUpdate(
        { _id : req.body.owner },
        { 
          storeOwner : true,
          store : store
        },
        { new : true },
        (err, userInfo)=> {
          if(err) return res.json({ success : false, err });

          return res.status(200).json({ success : true });
        }
      )  
    });
  });
});

//스토어 정보 수정
router.post("/edit", (req, res)=> {
  Store.findOneAndUpdate(
    { _id : req.body._id },
    { 
      name : req.body.name,
      desc : req.body.desc,
      category : req.body.category
    },
    { new : true },
    (err, storeInfo)=> {
      if(err) return res.json({ success : false, err });
      
      return res.status(200).json({ success : true });
    }
  )
});

module.exports = router;