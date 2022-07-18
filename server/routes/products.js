const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { Store } = require('../models/Store');
const { Product } = require('../models/Product');
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

//상품 이미지 업로드
router.post("/upload_image", auth, (req, res)=> {
  const username = req.user.username;
  const folderPath = `./client/public/upload/product/${username}`;

  //유저 전용 폴더 생성 
  const directory = fs.existsSync(folderPath);
  if(!directory) fs.mkdirSync(folderPath);

  //multer 옵션
  //허용 파일 유형
  const fileFilter = (req, file, cb) => {
    const type = path.extname(file.originalname);
    if (type === ".png" || type === ".jpg" || type === ".jpeg") {
      cb(null, true);
    } else {
      cb('Wrong file type. Only PNG, JPG, JPEG allowed.', false);
    }
  };
  //사이즈 제한
  const limits = {
    fileSize : 1 * 1024 * 1024
  };

  
  //multer 셋팅
  const storage = multer.diskStorage({
    destination : function(req, file, cb) {
      cb(null, folderPath);
    },
    filename : function(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, username + "_productImage_" + Date.now() + ext );
    }
  });

  const upload = multer({ storage, fileFilter, limits }).single("file");

  upload(req, res, err=> {
    if(err) return res.json({ 
      success : false, 
      err : (typeof err === "string") ? err : err.message
    });

    return res.status(200).json({
      success : true,
      filePath : res.req.file.path,
      fileName : res.req.file.filename
    });

  });
});

//상품 이미지 삭제
router.post('/delete_image', auth, (req, res)=> {
  const username = req.user.username;
  const targetImage = req.body.targetImage;

  deleteImages(targetImage, username, (err)=> {
    if(err) return res.json({ success: false, err });
  
    return res.status(200).json({ success: true });
  });
});

//상품 등록
router.post('/register', (req, res)=> {
  Store.findById(req.body.store, (err, storeInfo)=> {
    const product = new Product({
      ...req.body,
      index : storeInfo.productCounter + 1
    });

    product.save((err, productInfo)=> {
      if(err) return res.json({ success : false, err });
  
      Store.findOneAndUpdate(
        { _id : req.body.store },
        {
          $push : { product : product },
          $inc : { 
            productCounter : 1, 
            productTotal : 1 
          }
        },
        { new : true },
        (err, storeInfo)=> {
          if(err) return res.json({ success : false, err });

          return res.status(200).json({ success : true });
        }
      )
    });
  })
});

//상품 정보 요청
router.get('/product_by_id', (req, res)=> {
  const productId = req.query.id;

  Product.findOne({ index : productId }, (err, productInfo)=> {
    if(err || !productInfo) return res.json({ 
      success : false, 
      err : err ? err : "No matching result found."
    });
    
    return res.status(200).json({ success : true, productInfo });
  })
});

//상품 삭제
router.post('/delete', (req, res)=> {
  Product.findOneAndDelete({ _id: req.body._id }, (err)=> {
    if(err) return res.json({ success : false, err });

    Store.findOneAndUpdate(
      { _id : req.body.store },
      { 
        $inc : { 
          productTotal : -1
        },
        $pull : {
          product : req.body._id
        }
      },
      { new : true },
      (err, storeInfo)=> {
        if(err) return res.json({ success : false, err });

        const targetImage = req.body.targetImage;
        const username = req.body.username;

        deleteImages(targetImage, username, (err)=> {
          if(err) return res.json({ success: false, err });
        
          return res.status(200).json({ success: true });
        });
      }
    )
  })
});

//상품 수정
router.post('/edit', (req, res)=> {
  Product.findOneAndUpdate(
    { _id : req.body._id }, 
    {
      title : req.body.title,
      category : {
        department : req.body.category.department,
        productType : req.body.category.productType
      },
      price : {
        amount : req.body.price.amount,
        currency : req.body.price.currency
      },
      desc : req.body.desc,
      images : req.body.images,
      tags : req.body.tags
    },
    { new : true },
    (err, productInfo)=> {
      if(err) return res.json({ success : false, err });

      //기존 이미지가 삭제되었다면 서버에서 삭제
      const targetImage = req.body.targetImage;
      if(targetImage.length > 0) {
        const username = req.body.username;

        deleteImages(targetImage, username, (err)=> {
          if(err) return res.json({ success: false, err });
          return res.status(200).json({ success: true });
        });
      } else {
        return res.status(200).json({ success: true });
      }
  });
});

//상품 위시리스트에 추가 및 삭제
router.post('/like', auth, (req, res)=> {
  Product.findOne({ _id : req.body._id }, (err, productInfo)=> {
    if(err) return res.json({ success : false, err });

    const isLiked = productInfo.likes.users.some(user=> user.toString() === req.user._id.toString());
    const num = isLiked ? -1 : 1;
    const operator = isLiked ? "$pull" : "$push";

    Product.updateOne(
      { _id : req.body._id },
      { 
        $inc : { "likes.total" : num },
        [operator] : { "likes.users" : req.user._id } 
      },
      (err)=> {
        if(err) return res.json({ success : false, err });

        User.findOneAndUpdate(
          { _id : req.user._id },
          { [operator] : { wishlist : req.body._id } },
          { new : true },
          (err, userInfo)=> {
            if(err) return res.json({ success : false, err });

            return res.status(200).json({ success : true });
          }
        )
      }
    )
  });
});

function deleteImages(images, username, cb) {
  let num = images.length;
  images.forEach((image)=>{
    const filePath = `./client/public/upload/product/${username}/${image}`;

    //업로드 이미지가 있다면 삭제
    const isExist = fs.existsSync(filePath);

    if(isExist) fs.unlink(filePath, (err)=> {
      num--;

      if(err) {
        return cb(err);
      } else if(num <= 0) {
        return cb(null); 
      }
    });
  });
}

module.exports = router;