const express = require('express');
const router = express.Router();
const { User } = require('../models/User');

//회원가입
router.post("/register", (req, res)=> {
    const user = new User(req.body);

    user.save((err, userInfo)=> {
        if(err) return res.status(400).json({ success : false, err });
        return res.status(200).json({ success : true, userInfo })
    });
});

//로그인
router.post("/login", (req, res)=> {
    User.findOne({ username : req.body.username  }, (err, userInfo)=> {
        if(err) return res.status(400).json({ success : false, err });
        //해당 username이 DB에 존재하지 않을 때
        if(!userInfo) return res.status(204).json({ 
            success : false, 
            err : "Username Not Found" 
        });
        
        userInfo.comparePassword(req.body.password, (err, isMatch)=> {
            if(err) return res.status(400).json({ success : false, err });
            //비밀번호가 틀렸을 때
            if(!isMatch) return res.status(204).json({ 
                success : false, 
                err : "Incorrect Password"
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

module.exports = router;