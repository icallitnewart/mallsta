const express = require('express');
const router = express.Router();
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
    profileImage : req.user.profileImage,
    role : req.user.role,
    cart : req.user.cart,
    purchaseHistory : req.user.purchaseHistory,
    storeOwner : req.user.storeOwner
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

//프로필 이미지 업로드
router.post('/upload_image', auth, (req, res)=> {
  const username = req.user.username;
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

  //multer 설정
  const storage = multer.diskStorage({
    destination : function(req, file, cb) {
      cb(null, './client/public/upload/profile');
    },
    filename : function(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, username + "_" + Date.now() + ext );
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
      { profileImage : `/upload/profile/${req.file.filename}`},
      { new : true},
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

module.exports = router;