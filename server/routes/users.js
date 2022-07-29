const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

//회원가입
router.post("/register", (req, res)=> {
  const user = new User(req.body);

  user.save((err, userInfo)=> {
    if(err) return res.json({ success : false, err });
    return res.status(200).json({ success : true, userInfo })
  });
});


//회원정보 요청
router.post("/getInfo", (req, res)=> {
  User
  .findOne({ username : req.body.username })
  .populate("store")
  .exec((err, userInfo)=> {
    if(err) return res.json({ success : false, err });

    return res.status(200).json({
      success : true,
      userInfo
    });
  })
});


//회원정보 수정
router.post("/edit", auth, async function (req,res) {
  const user = req.body;
  const isPassword = (user.passwordNew !== "" ? true : false);

  User.findOne({ username : user.username }, (err, userInfo)=> {
    //회원정보 변경 함수
    const updateInfo = ()=> {
      userInfo.updateInfo(user, (result)=> {
        if(!result.success) return res.json(result);

        res.status(200).json(result);
      });
    };

    //비밀번호 변경시
    if(isPassword) {
      //현재 비밀번호 확인
      userInfo.comparePassword(user.passwordCurrent, (err, isMatch)=> {
        if(err) return res.json({ success : false, err});
        
        //틀린 비밀번호
        if(!isMatch) return res.json({ 
          success : false, 
          message : "Incorrect Password."
        });

        updateInfo();
      });
    } else {
      updateInfo();
    }
  });
});


//로그인
router.post("/login", (req, res)=> {
  User.findOne({ username : req.body.username  }, (err, userInfo)=> {
    if(err) return res.status(400).json({ success : false, err });
    //해당 username이 DB에 존재하지 않을 때
    if(!userInfo) return res.json({ 
      success : false, 
      message : "Username Not Found." 
    });
    
    userInfo.comparePassword(req.body.password, (err, isMatch)=> {
      if(err) return res.json({ success : false, err });
      //비밀번호가 틀렸을 때
      if(!isMatch) return res.json({ 
        success : false, 
        message : "Incorrect Password."
      });

      //비밀번호가 일치한다면 토큰 생성 후 쿠키에 저장
      userInfo.generateToken((err, user)=> {
        if(err) return res.status(400).json({ success : false, err });

        res.cookie("x_auth", user.token)
          .status(200)
          .json({ success : true, userId : user._id });
      });
    });
  });
});

//로그인 인증(auth) 통과
router.get('/auth', auth, (req, res)=> {
  res.status(200).json({
    _id : req.user._id,
    isAdmin : req.user.role === 0 ? false : true,
    isAuth : true,
    username : req.user.username,
    email : req.user.email,
    phone : req.user.phone,
    address : req.user.address,
    rank : req.user.rank,
    profileImage : req.user.profileImage,
    role : req.user.role,
    cart : req.user.cart,
    wishlist : req.user.wishlist,
    order : req.user.order,
    storeOwner : req.user.storeOwner,
    store : req.user.store
  });
});

//로그아웃
router.get('/logout', auth, (req, res)=> {
  User.findOneAndUpdate(
    { _id : req.user._id },
    { token : "" },
    (err, user)=> {
      if(err) return res.status(400).json({ success : false, err });

      res.clearCookie("x_auth");
      return res.status(200).json({ success : true });
    }
  )
});

//아이디 중복 체크
router.post('/check_username', (req, res)=> {
  User.findOne(
    { username : req.body.username },
    (err, user)=> {
      if(user) {
        return res.json({ 
          isExist : true, 
          message : "Username already exists."
        });
      } else {
        return res.status(200).json({ isExist : false });
      }
    }
  )
});

//이메일 중복 체크
router.post('/check_email', (req, res)=> {
  User.findOne(
    { email : req.body.email },
    (err, user)=> {
      if(user) {
        return res.json({ 
          isExist : true, 
          message : "Email already exists."
        });
      } else {
        return res.status(200).json({ isExist : false });
      }
    }
  )
});

//프로필 이미지 삭제
router.get('/delete_image', auth, (req, res)=> {
  const username = req.user.username;
  const folderPath = `./client/public/upload/profile/${username}`;

  const directory = fs.existsSync(folderPath);
  if(directory) { //프로필 이미지가 있다면 삭제
    fs.rmSync(folderPath, { recursive: true });

    //DB 업데이트
    User.findOneAndUpdate(
      { username }, 
      { profileImage : null },
      { new : true},
      (err, userInfo)=> {
        if(err) return res.json({ success : false, err });

        return res.json({ success : true });
      }
    )
  } else {  //기본 이미지인 경우
    return res.json({ 
      success : false , 
      err : "Nothing to delete. You haven't uploaded your own profile image."
    });
  }
});

//프로필 이미지 업로드
router.post('/upload_image', auth, (req, res)=> {
  const username = req.user.username;
  const folderPath = `./client/public/upload/profile/${username}`;

  //유저 전용 폴더 생성 
  //*이미 폴더가 존재한다면 삭제 후 재생성
  //**파일 업데이트 후 예전 파일을 삭제하기 위함 
  const directory = fs.existsSync(folderPath);
  if(directory) fs.rmSync(folderPath, { recursive: true });
  fs.mkdirSync(folderPath);
  

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
      cb(null, username + "_profileImage_" + Date.now() + ext );
    }
  });
  const upload = multer({ storage, fileFilter, limits }).single("file");

  //업로드 함수
  upload(req, res, err=> {
    if(err) return res.json({ 
      success : false, 
      err : (typeof err === "string") ? err : err.message
    });
    
    User.findOneAndUpdate(
      { username }, 
      { profileImage : `/upload/profile/${username}/${req.file.filename}`},
      { new : true },
      (err, userInfo)=> {
        if(err) return res.json({ success : false, err });

        return res.json({
          success : true,
          filePath : res.req.file.path,
          fileName : res.req.file.filename
        });
      }
    )
  });

});

//위시리스트 목록 요청
router.get('/wishlist', auth, (req, res)=> {
  const storeId = req.query.storeId;
  const storeItems = {
    path : "wishlist",
    match : {
      store : storeId
    }  
  };

  User
  .findById(req.user._id)
  .populate(
    storeId 
    //1. 현 스토어에서 위시리스트에 추가한 상품
    ? storeItems 
    //2. 유저의 위시리스트에 추가한 모든 상품
    : "wishlist"
  )
  .exec((err, userInfo)=> {
    if(err) return res.json({ success : false, err });

    return res.status(200).json({ 
      success : true,
      wishlist : userInfo.wishlist
    });
  });
});

//장바구니 담기
router.post('/add_to_cart', auth, (req, res)=> {
  User
  .findById(req.user._id)
  .populate("cart")
  .exec((err, userInfo)=> {
    if(err) return res.json({ success : false, err });

    const isExist = userInfo.cart.some(item=> item.product._id.toString() === req.body.product._id.toString());
    
    //장바구니에 해당 상품이 없을 경우
    if(!isExist) {
      User.findOneAndUpdate(
        { _id : req.user._id },
        { $push : {
            cart : {
              product : req.body.product,
              quantity : req.body.quantity
            }
          } 
        },
        { new : true },
        (err, userInfo)=> {
          if(err) return res.json({ success : false, err });

          return res.status(200).json({ 
            success: true,
            cartItems : userInfo.cart
          });
        }
      );
    } 
    //장바구니에 이미 해당 상품이 있을 경우
    else {
      User.findOneAndUpdate(
        { 
          _id : req.user._id,
          "cart.product" : req.body.product._id
        },
        { $inc : {
            "cart.$.quantity" : req.body.quantity
          } 
        },
        { new : true },
        (err, userInfo)=> {
          if(err) return res.json({ success : false, err });
          
          return res.status(200).json({ 
            success: true,
            cartItems : userInfo.cart 
          });
        }
      );
    }
  });
});

//장바구니 (+위시리스트) 정보 요청
router.get('/cartItems', auth, (req, res)=> {
  User
  .findById(req.user._id)
  //장바구니 상품 정보
  .populate({
    path : "cart",
    populate : {
      path : "product",
      model : "Product"
    }
  })
  //상품의 스토어 정보
  .populate({
    path : "cart.product",
    populate : {
      path : "store",
      model : "Store"
    }
  })
  //위시리스트 정보
  .populate("wishlist")
  .exec((err, userInfo)=> {
    if(err) return res.json({ success : false, err });

    return res.status(200).json({
      success : true,
      cartItems : userInfo.cart,
      wishlist : userInfo.wishlist
    });
  });
});

//장바구니에서 상품 삭제
router.post('/delete_cart', auth, (req, res)=> {
  User.findOneAndUpdate(
    { _id : req.user._id },
    { $pull : {
        cart : {
          product : req.body.product._id
        }
      } 
    },
    { new : true },
    (err, userInfo)=> {
      if(err) return res.json({ success : false, err });

      return res.status(200).json({ 
        success : true, 
        cartItems : userInfo.cart 
      });
    }
  )
});

module.exports = router;