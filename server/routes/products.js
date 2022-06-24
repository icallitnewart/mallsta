const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

//상품 이미지 업로드
router.post("/upload_image", auth, (req, res)=> {
  const username = req.user.username;
  const folderPath = `./client/public/upload/product/${username}`;
  console.log(req.body);

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
  const filePath = `./client/public/upload/product/${username}/${targetImage}`;

  //업로드 이미지가 있다면 삭제
  const isExist = fs.existsSync(filePath);

  if(isExist) fs.unlink(filePath, (err)=> {
    if(err) return res.json({ success: false, err });

    return res.status(200).json({ success: true });
  });
});

module.exports = router;